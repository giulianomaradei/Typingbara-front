<template>
    <div class="text-container">
        <span class="letter" v-for="(letter,index) in data.text" :key="index">
            <span class="text-line" v-if="index===data.index"></span>
            <Letter :color="data.colors[index]">{{letter}}</Letter>
        </span>
    </div>

</template>

<script setup>
import Letter from './Letter.vue';


    const data = reactive({
        colors: [],
        text: "Albion Online é um MMORPG SandBox em que você escreve sua própria história, Invés de seguir um caminho pré-determinado. Explore um vasto mundo aberto que consiste de 5 ecosistemas únicos.",
        index: 1
    });

    

    const formatedText = computed(() => {
        return data.text.split(' ');
    });

    onMounted(()=>{
        data.colors = (new Array(data.text.length).fill('white'))
    })

</script>

<style lang="css" scoped>

    .letter{

    }

    .text-line{
        padding: 2px 1px;
        background-color: red;
    }
    .text-container{

    }
</style>