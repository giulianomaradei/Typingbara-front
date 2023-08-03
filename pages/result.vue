<template>
    <div class="result">
        <div><span>WPM: </span>{{ result.wordsPerMinute }}</div>
        <div><span>Accuaracy: </span>{{ result.accuracy }}%</div>
        <div><span>C&W: </span>{{ `${result.correctCharacters}/${result.wrongCharacters}`  }}</div>
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
        font-size: 3rem;
        color: rgb(255, 157, 0);
    }

    span{
        font-size: 4rem;
    }
</style>