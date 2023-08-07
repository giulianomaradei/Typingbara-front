<template>
    <div class="result-container">
        <div class="result">
            <div>WPM: {{ result.wordsPerMinute }}</div>
            <div>Accuaracy: {{ result.accuracy }}%</div>
            <div>C&W: {{ `${result.correctCharacters}/${result.wrongCharacters}`  }}</div>
        </div>
        <div class="result-actions">
            <font-awesome-icon class="newText" :icon="['fas', 'rotate']" />
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
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

    .result-actions{
        display: flex;
        gap: 2rem;
        *{
            font-size: clamp(1rem, 0.9074rem + 0.4938vw, 1.5rem);
            cursor: pointer;
        
            &:hover {
                color: darken(#ffffff, 15%); /* Cor um pouco mais escura quando o cursor estiver em cima */
            }
        }
    }

    span{
        font-size: 4rem;
    }
</style>