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

        const currentWord = store.words[store.wordIndex];
        const lastWord = store.words[store.wordIndex-1] ?? null;
        // just for reducing boiler plate from the store

        if(regex.test(key)){
            if(key === store.text[store.letterIndex]){  
                store.colors[store.letterIndex] = 'white'
                store.words[store.wordIndex].lastWritedIndex = store.letterIndex +1;
                store.words[store.wordIndex].lettersLeft--;
                store.letterIndex+=1;
            }else{
                store.colors[store.letterIndex] = 'red';
                store.letterIndex+=1;
            }
        }else{
            if(key === "Backspace"){

                if(store.letterIndex <= 0 ){ //start of the text cannot go back
                    return;   
                }

                console.log(lastWord);

                if(lastWord?.lastWritedIndex){ // last word and lastIndex exists
                    if(store.wordIndex-1 >=0 && store.letterIndex === currentWord.start && lastWord.lettersLeft === 0){ // If we are at the beginning of the word and are trying to do a backspace, which would make us go back to the last word, so we gotta check if it wasn't already complete.
                        return;
                    }
                }


                if (currentWord.start > store.letterIndex - 1 && lastWord.lastWritedIndex !== undefined){ // if we are in the start of a word and do a backspace we need to go to the last writed letter in the previous word
                    store.letterIndex = lastWord.lastWritedIndex ?? store.letterIndex;
                    store.words[store.wordIndex].lastWritedIndex = undefined;
                    store.wordIndex--;
                }else{
                    store.letterIndex-=1;
                    if(store.colors[store.letterIndex] === "white"){ // if i'm deleting a already correct letter there will be one more letter left
                        store.words[store.wordIndex].lettersLeft++;
                    }
                    store.colors[store.letterIndex] = "gray";
                }
            }
            if(key === ' ' && currentWord.start !== store.letterIndex){
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