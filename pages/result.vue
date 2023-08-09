<template>
    <div class="result-container">
        <div class="result">
            <div>WPM: {{ result.wordsPerMinute }}</div>
            <div>Accuaracy: {{ result.accuracy }}%</div>
            <div>C&W: {{ `${result.correctCharacters}/${result.wrongCharacters}`  }}</div>
        </div>
        <div>
            <div class="button">
                <div class="tooltip">Next Text</div>
                <font-awesome-icon @click="this.$router.push('/')" class="iconButton" :icon="['fas', 'arrow-right']" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, reactive, onMounted } from 'vue';
    import { useTypingStore } from '../store/typing/typingStore'

    const store = useTypingStore();
    const route = useRoute()
    const { $router } = useNuxtApp();

    const result = computed(()=>{
        return store.result;
    })
</script>

<style lang="scss" scoped>
    .result{
        font-size: clamp(2rem, 1.8148rem + 0.9877vw, 3rem);
        color: rgb(255, 157, 0);
    }
    .result-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    span{
        font-size: 4rem;
    }    
    .result-actions{
        display: flex;
    }
</style>