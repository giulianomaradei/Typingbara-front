<template>
    <div class="text-container">
        <span v-for="(letter,index) in text" :key="index">
            <span v-if="index === data.letterIndex"  class="text-line"></span>
            <span :style="{color: data.colors[index]}">{{letter}}</span>
        </span>
    </div>

</template>

<script setup lang="ts">

    import { computed, reactive, onMounted } from 'vue';
    import { useTypingStore } from '../../store/typing/typingStore'
    import { Word } from './types';

    const store = useTypingStore();
    const { $axios } = useNuxtApp();

    const text = computed(()=>{
        return data.text;
    })

    const data = reactive({
        text: "",
        letterIndex: 0,
        wordIndex:0,
        colors: [] as string[],
        words: [] as Word[]
    })

    function keyPressed(event: KeyboardEvent){
        const { key } = event;

        const regex = /^[a-zA-Z'.,:?!]$/;

        const currentWord = data.words[data.wordIndex];
        const lastWord = data.words[data.wordIndex-1] ?? null;
        // just for reducing boiler plate from the store

        if(regex.test(key)){
            if(key === data.text[data.letterIndex]){  
                data.colors[data.letterIndex] = 'white'
                data.words[data.wordIndex].lettersLeft--;
            }else{
                data.colors[data.letterIndex] = 'red';
            }
            data.words[data.wordIndex].lastWritedIndex = data.letterIndex +1;
            data.letterIndex+=1;
        }else{
            if(key === "Backspace"){

                if(data.letterIndex <= 0 ){ //start of the text cannot go back
                    return;   
                }

                console.log(lastWord);

                if(data.wordIndex-1 >=0 && data.letterIndex === currentWord.start && lastWord.lettersLeft === 0){ // If we are at the beginning of the word and are trying to do a backspace, which would make us go back to the last word, so we gotta check if it wasn't already complete.
                    return;
                }
                
                if (currentWord.start > data.letterIndex - 1){ // if we are in the start of a word and do a backspace we need to go to the last writed letter in the previous word
                    data.letterIndex = lastWord.lastWritedIndex;
                    data.words[data.wordIndex].lastWritedIndex =  data.words[data.wordIndex].start;
                    data.wordIndex--;
                }else{
                    data.letterIndex-=1;
                    if(data.colors[data.letterIndex] === "white"){ // if i'm deleting a already correct letter there will be one more letter left
                        data.words[data.wordIndex].lettersLeft++;
                        data.words[data.wordIndex].lastWritedIndex--;
                    }
                    data.colors[data.letterIndex] = "gray";
                }
            }
            if(key === ' ' && currentWord.start !== data.letterIndex){
                data.letterIndex = data.words[++data.wordIndex].start
                
            }
        }
    }

    function setData( text: string ){
        let newWords: Word[] = [];
        let length = 0;
        let word = "";
        let start=0,lastWritedIndex;

        for (var i = 0; i < text.length; i++) {
          if(text[i] !== ' '){
            length++;
            word+=text[i];
          }else{
            newWords.push({
              start,
              word,
              length,
              lastWritedIndex: start,
              index: newWords.length,
              lettersLeft: length
            });
            start = i+1;
            word = "";
            length= 0
          }
        }
        data.words = newWords;
        data.text = text
        data.colors = (new Array(data.text.length).fill('gray'))
    }

    async function getRandomText(){
        const text = (await $axios.get('http://metaphorpsum.com/paragraphs/1')).data
        setData(text)
    }

    const colors = computed(()=>{
        return data.colors;
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