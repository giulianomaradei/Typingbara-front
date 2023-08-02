<template>
    <div>
        <div> {{ result.wordsPerMinute }}</div>
        <div> {{ result.accuracy }}</div>
        <div> {{ `${result.correctCharacters} / ${result.wrongCharacters}`  }}</div>
        <div> {{ result.wordsPerMinute }}</div>
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

</style>