<template>
    <div class="text-container">
        <span v-for="(letter,index) in text" :key="index">
            <span v-if="index === store.letterIndex"  class="text-line"></span>
            <span :style="{color: store.colors[index]}">{{letter}}</span>
        </span>
    </div>

</template>

<script setup lang="ts">

    import { computed, reactive, onMounted } from 'vue';
    import { useTypingStore } from '../../store/typing/typingStore'

    const store = useTypingStore();
    const { $axios } = useNuxtApp();

    const text = computed(()=>{
        return store.text;
    })

    function keyPressed(event: KeyboardEvent){
        const { key } = event;

        const regex = /^[a-zA-Z'.,:?!]$/;

        if(regex.test(key)){
            if(key === store.text[store.letterIndex]){  
                store.colors[store.letterIndex] = 'white'
                store.words[store.wordIndex].lastWritedIndex = store.letterIndex +1;
                store.letterIndex+=1;
            }else{
                store.colors[store.letterIndex] = 'red';
                store.letterIndex+=1;
            }
        }else{
            if(key === "Backspace" && store.letterIndex > 0){

                if (store.words[store.wordIndex].start > store.letterIndex - 1 && store.words[store.wordIndex - 1].lastWritedIndex !== undefined){
                    store.letterIndex = store.words[store.wordIndex - 1].lastWritedIndex ?? store.letterIndex;
                    store.words[store.wordIndex].lastWritedIndex = undefined;
                    store.wordIndex--;
                }else{
                    store.letterIndex-=1;
                    store.colors[store.letterIndex] = "gray";
                    console.log("aqyu")
                }
            }
            if(key === ' ' && store.words[store.wordIndex].start !== store.letterIndex){
                store.letterIndex = store.words[++store.wordIndex].start
                
            }
        }
    }

    async function getRandomText(){
        const text = (await $axios.get('http://metaphorpsum.com/paragraphs/1')).data
        store.setText(text)
        store.colors = (new Array(store.text.length).fill('gray'))
    }

    const colors = computed(()=>{
        return store.colors;
    })

    onMounted(()=>{
        window.addEventListener("keydown", keyPressed )
        getRandomText();
    })

</script>

<style lang="css" scoped>
    .text-container{
        width: 80rem;
        max-width: 90%;
    }

    span{
        font-size: 1.7rem;
    }

    .text-line{
        padding: 2px 1px;
        background-color: red;
        font-size: 1.7rem;
        font-weight: bold;
    }
</style>