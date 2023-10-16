<template>
    <div :key="route.fullPath" class="game-container" v-if="data.words.length > 0">
        <ClipboardLink :gameId="route.params.id"></ClipboardLink>
        <div v-if="data.players.length < 2" class="waiting"> wainting for more players...</div>
        <div class="typing-wraper">
            <div class="countdow"></div>
            <Typing 
                @correctCharacter="handleCorrectCharacter" 
                @typing="handleTyping"
                @textGenerated="handleTextGenerated"
                :words="data.words"
                :inputable="data.inputable"
                :amountOfWords="20"
            >
            </Typing>
            <Timer v-if="data.timerOn" :time="data.timer" :callback="handleStart"><span>seg to start</span></Timer>
        </div>
        <div v-for="(player, index) in data.players" class="player-container">
            <div class="capy-container">
                <div class="player-name">{{player.name}}</div>
                <CapybaraGif ref="capybaraGifRef" :progress="data.players[index].progress"></CapybaraGif>
            </div>
            <div class="player-info">
                <div v-if="player.position" class="player-position" :class="getPlayerClass(player.position)">{{ player.position }}° Place </div>
                <div>{{ player.wordsPerMinute }} wpm</div>
            </div>
            
        </div>
    </div>
    <div v-else class="c-loader"></div>

</template>

<script setup lang="ts">

    import { Player, TextSent, PlayerTyping, PlayerFinished , GameFinished} from '~/types/Multiplayer';
    import Timer from '~/components/Typing/Timer.vue';
    import ClipboardLink from '~/components/Multiplayer/ClipboardLink.vue';
    import CapybaraGif from '~/components/Multiplayer/CapybaraGif.vue';

        
    const { $router, $echo, $axios } = useNuxtApp()
    const route = useRoute();

    const capybaraGifRef = ref<InstanceType<typeof CapybaraGif> | null>(null)

    const data = reactive({
        players: [] as Player[],
        words: [] as string[],
        text: '',
        animateCapybara: false,
        correctWords: 0,
        timer: 10,
        inputable: false,
        timerOn: false,

        sendPlayerTypingIntervalId: null as NodeJS.Timer | null,

        playersFinished: 0
    })


    function handleTextGenerated(text: string){
        data.text = text;
    }

    function handleTyping(text: string){
        if(!data.sendPlayerTypingIntervalId){
            data.players[0].start = Date.now();
            data.sendPlayerTypingIntervalId = setInterval(()=>{
                if(data.correctWords <= data.text.length){
                    updateUserStatistics();
                    ($echo.private(`game.${route.params.id}`) as any).whisper('PlayerTyping', {
                        player: data.players[0]
                    });
                }else{
                    data.inputable = false;
                }
            }, 3000);
        }
    }

    function handleStart(){
        data.inputable = true;
        data.timerOn = false;
    }

    async function getWords(){
        return (await $axios.get(`https://random-word-api.vercel.app/api?words=200`)).data;
    }

        
    function generateString(length: number) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    async function gameFinished(){
        data.players = data.players.map((player: Player) => {
            player.position = null;
            player.progress = 0;
            player.start = null;
            player.wordsPerMinute = 0;
            return player;
        });

        data.correctWords = 0;
        data.timer = 10;
        data.timerOn = true;
        data.inputable = false;
        data.playersFinished = 0;
        data.text = '';
        data.sendPlayerTypingIntervalId = null;
    }

    async function handleCorrectCharacter(amount: number){
        capybaraGifRef.value[0]?.moveCapybara();
        data.correctWords += amount;
        data.players[0].progress += ((100 / data.text.length) * amount);

        if(data.correctWords === data.text.length){
            clearInterval(data.sendPlayerTypingIntervalId!);
            data.players[0].position = data.playersFinished + 1;
            data.playersFinished++;
            
            if(data.playersFinished === data.players.length){
                ($echo.private(`game.${route.params.id}`) as any).whisper('GameFinished', {});

                setTimeout(() => {
                    $router.push(`/game/${route.params.id}`);
                },200);
                $router.push("/");
            }
            
            ($echo.private(`game.${route.params.id}`) as any).whisper('PlayerFinished', {
                player: data.players[0]
            });
        }
    }

    function updateUserStatistics(){
        const minutesElapsed = (Date.now() - data.players[0].start!) / 60000;
        data.players[0].wordsPerMinute = Math.round((data.correctWords / 5) / minutesElapsed);
    }
    
    function broadcastText(){
        setTimeout(()=>{
            ($echo.private(`game.${route.params.id}`) as any).whisper('TextSent', {text: data.text})
        }, 100);
    }

    function handlePlayerHere(users: any){
        for(let user of users){
            data.players.push({
                id: user.id,
                name: user.name,
                progress: 0,
                wordsPerMinute: 0,
                start: 0,
                position: null
            })
        }    
               
        const lastUser = data.players.pop();
        data.players.unshift(lastUser!);
    }

    async function handleRedirects(users: any){
        if(users.length > 4){
            $router.push('/');
        }else if(users.length >= 2){
            data.timerOn = true;
        }else if(users.length === 1 && data.words.length === 0){
            data.words = await getWords();
        }
    }

    function getPlayerClass(position: number): string {
        if (position === 1) {
            return 'gold';
        } else if (position === 2) {
            return 'silver';
        } else if (position === 3) {
            return 'bronze';
        } else {
            return '';
        }
    }

    onMounted(async ()=>{

        $echo.join(`game.${route.params.id}`)
            .here(async (users: any) => {
                handleRedirects(users);
                handlePlayerHere(users);
            })
            .joining((user: any) => {
                data.players.push({
                    id: user.id,
                    name: user.name,
                    progress: 0,
                    wordsPerMinute: 0,
                    start: 0,
                    position: null
                });
                if(data.players.length >= 2){
                    data.timerOn = true;
                }
                broadcastText();
            })
            .leaving((userLeaving: any) => {
                data.players = data.players.filter((user: any) => user.id !== userLeaving.id);
                if(data.players.length < 2 && data.timer > 0){
                    data.timerOn = false;
                    data.timer = 10;
                }
            })
            .error((error: any) => {
                console.error(error);
            });
            
            $echo.private(`game.${route.params.id}`).listenForWhisper('TextSent', (event: TextSent) => {
                if(data.words.length === 0){
                    data.words = event.text.split(' ');
                    data.text = event.text;
                }
            });
            
            $echo.private(`game.${route.params.id}`).listenForWhisper('PlayerTyping', (event: PlayerTyping) => {
                if(event.player.id === data.players[0].id){
                    return;
                }
                const player = data.players.find((player: any) => player.id === event.player.id);
                player!.progress = event.player.progress;
                player!.wordsPerMinute = event.player.wordsPerMinute;
            });

            $echo.private(`game.${route.params.id}`).listenForWhisper('PlayerFinished', (event: PlayerFinished) => {
                const player = data.players.find((player: any) => player.id === event.player.id);
                player!.position = event.player.position;
                data.playersFinished++;
            });

            $echo.private(`game.${route.params.id}`).listenForWhisper('GameFinished', () => {
                setTimeout(() => {
                    $router.push(`/game/${route.params.id}`);
                },200);
                $router.push("/");
            });
    })

    onUnmounted(()=>{
        $echo.leaveAllChannels();

        clearInterval(data.sendPlayerTypingIntervalId!);

        localStorage.removeItem('player_id');
    })

</script>

<style scoped>
    .game-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 90vw;

    }
    .player-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;
        width: 100%;
        margin: 1rem 0;
        width: 45rem;
    }

    .capy-container{
        width: 80%;
        border-bottom: 2px dashed white;
        display: flex;
        flex-direction: row;
        height: 6vh;
        position: relative;
    }

    .player-name{
        display: flex;
        width: 25%;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        flex-wrap: wrap;
        padding: 0.3rem;
        padding-right: 3rem;
        font-size: 1.1rem;
        font-family: RobotMono;
    }

    
    .player-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.3rem;
        flex: 1;
        font-family: RobotMono;
    }

    .player-position{
        font-weight: 100;
    }

    .typing-wraper{
        position: relative;
    }
    

    .gold {
        color: gold;
    }

    .silver {
        color: silver;
    }

    .bronze {
        color: #cd7f32;
    }

    .waiting{
        animation: blink 2s linear infinite;
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }

    }

    
</style>