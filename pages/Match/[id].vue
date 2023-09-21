<template>
    <div class="match-container">
        <div class="typing-wraper">
            <div class="countdow"></div>
            <Typing 
                @wronCharacter="handleWrongCharacter" 
                @correctCharacter="handleCorrectCharacter" 
                @start="handleStart"
                :amountOfWords="25"
            >
            </Typing>
        </div>
        <div v-for="(player, index) in data.players" class="player-container">
            <div class="capy-container">
                <div class="player-name">{{player.name}}</div>
                <img class="player-capy" :style="getPlayerPadding(index)" src="~/assets/images/capybaraAnimation/ezgif.com-reverse.gif">
            </div>
            <div class="player-wpm">{{ player.wordsPerMinute }} wpm</div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { Player } from '~/types/Typing'
    import { useUserStore } from '~/store/User/UserStore';
    
    const { $echo, $axios } = useNuxtApp()
    const userStore = useUserStore();
    const route = useRoute();

    const sillyNames = [
        "Fluff McSneeze",
        "Wobble Wiggle",
        "Giggle Goggles",
        "Quirky Quill",
        "Goofy Goggles",
        "Noodle Noggin",
        "Snick Snack",
        "Peel Banana",
        "Dizzy Doodle",
        "Fumble Fingers",
        "Wobble Berry",
        "Chuckle Chuck",
        "Silly Queen",
        "Bumble Flop",
        "Whimsy Doodle"
    ];


    const data = reactive({
        players: [] as Player[],
        text: "",
        
    })

    function getPlayerPadding(index: number){
        return {
            "padding-left": `${data.players[index].progress}%`
        }    
    }

    function handleStart(text: string){
        data.text = text;
    }

    function handleCorrectCharacter(amount : number){
        data.players[0].progress += (100 / data.text.length);
    }

    function handleWrongCharacter(amount : number){
        
    }
    
    onMounted(async ()=>{
        
        const name = userStore.user.id ? userStore.user.name : sillyNames[Math.floor(Math.random() * sillyNames.length)];


        let players = [];
        if(!localStorage.getItem('player')){
            players = (await $axios.post(`/game/connect/${route.params.id}`, {
                player: name
            })).data.data.players;
            
            localStorage.setItem('player', name);
        }else{
            players = (await $axios.get(`/game/${route.params.id}`)).data.data.players;
            console.log(players);
        }

        for(let player of players){
            data.players.push({
                id: player.id,
                name: player.name,
                progress: 0,
                wordsPerMinute: 0
            })
        }
            

        $echo.channel(`match.${route.params.id}`).listen('PlayerConnected', (eventData: any) => {
            console.log("playerConnected",eventData)
            data.players.push({
                id: eventData.player.id,
                name: eventData.player.name,
                progress: 0,
                wordsPerMinute: 0
            })
        });


    })

    onUnmounted(()=>{
        $echo.leaveAllChannels();
        localStorage.removeItem('player');
    })

</script>

<style scoped>
    .match-container{
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
        width: 90%;
        border-bottom: 2px dashed white;
        display: flex;
        flex-direction: row;
    }

    .player-name{
        display: flex;
        width: 15%;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        padding: 0.3rem;
        font-size: 1.1rem;
        font-family: RobotMono;
    }

    .player-capy{
        padding: 0;
        height: 6vh;
    }

    
    .player-wpm{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.3rem;
        flex: 1;
        font-family: RobotMono;
    }


    
</style>