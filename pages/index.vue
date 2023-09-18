<template>
    <div class="text-frame">
        <div class="typing-wraper">
            <Typing 
                @wronCharacter="handleWrongCharacter" 
                @correctCharacter="handleCorrectCharacter" 
                @start="resetResults"
                :amountOfLines="3"
                ref="typing"
            >
            </Typing>
            <Timer v-if="data.started" :time="30" :callback="finished"></Timer> 
        </div>
        <div class="button" @click="newTextHandler">
            <div class="tooltip">New Text</div>
            <font-awesome-icon class="iconButton" icon="fa-solid fa-rotate" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTypingStore } from '~/store/Typing/TypingStore';
    import { useUserStore } from '~/store/User/UserStore';
    import Typing from '~/components/Typing/Typing.vue';
    import { Result } from '~/types/Typing'

    import Timer from '~/components/Typing/Timer.vue';

    const typingStore = useTypingStore();
    const userStore = useUserStore();
    const { $axios, $router } = useNuxtApp();

    const typing = ref<InstanceType<typeof Typing> | null>(null)

    const data = reactive({
        result: {
            wordsPerMinute: 0,
            accuracy: 0,
            time: 30,
            correctCharacters: 0,
            wrongCharacters: 0,
        } as Result,
        started: false,
    })

    function handleCorrectCharacter(amount : number){
        data.result.correctCharacters += amount;
    }

    function handleWrongCharacter(amount : number){
        data.result.wrongCharacters += amount;
    }

    function newTextHandler(){
        typing.value?.getRandomText();
    }

    async function finished(){
        const result = data.result;
        data.result.wordsPerMinute = Math.max(0,Math.trunc((((result.wrongCharacters + result.correctCharacters)/5) - result.wrongCharacters )/(result.time/60)));
        data.result.accuracy = Math.trunc((100 * result.correctCharacters) / (result.wrongCharacters + result.correctCharacters))
        typingStore.result = data.result;

        const formatedResult = {
            user_id: userStore.user.id,
            words_per_minute: data.result.wordsPerMinute,
            accuracy: data.result.accuracy,
            duration_seconds: data.result.time,
        }
        if(userStore.user.id){
            $axios.post(`/user/result/${userStore.user.id}`, formatedResult );
        }
        $router.push('/result')
    }

        
    function resetResults(){
        data.result = {
            wordsPerMinute: 0,
            accuracy: 0,
            time: 30,
            correctCharacters: 0,
            wrongCharacters: 0,
        }
    }

    onMounted(async ()=>{
        if(localStorage.getItem('token')){
            userStore.user = (await $axios.get('/user')).data.data;
        }
        window.addEventListener("keydown", ()=>{data.started = true} );
    })
</script>

<style lang="css" scoped>
    .text-frame{
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .typing-wraper{
        position: relative;
    }
</style>