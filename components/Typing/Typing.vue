<template>
    <div id="typing-container">
        <div class="text-container">
            <div v-for="(line, lineId) in data.lines" :key="lineId">
                <span v-for="(letter, letterId) in line.line" :key="letterId">
                    <span v-if="lineId === data.lineIndex && data.letterIndex === data.absoluteLetterIndexex[lineId][letterId]"  class="text-line"></span>
                    <span :style="{color: data.colors[data.absoluteLetterIndexex[lineId][letterId]]}">{{letter}}</span>
                </span>
            </div>
        </div>
        <font-awesome-icon :icon="['fas', 'rotate']" />
    </div>

</template>

<script setup lang="ts">

    import { computed, reactive, onMounted } from 'vue';
    import { useTypingStore } from '../../store/typing/typingStore'
    import { Word, Line } from './types';

    const store = useTypingStore();
    const { $axios } = useNuxtApp();

    const data = reactive({
        text: "",
        letterIndex: 0,
        wordIndex:0,
        lineIndex: 0,
        colors: [] as string[],
        words: [] as Word[],
        lines: [] as Line[],
        absoluteLetterIndexex: [] as number[][] 
    })

    function keyPressed(event: KeyboardEvent){
        const { key } = event;

        const regex = /^[a-zA-Z'.,:?!]$/;

        const currentWord = data.words[data.wordIndex];
        const lastWord = data.words[data.wordIndex-1] ?? null;
        // just for reducing boiler plate from the data word

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
        data.lines = divideTextInLines();
        data.colors = (new Array(data.text.length).fill('gray'))
    }

    async function getRandomText(){
        const text = (await $axios.get('http://metaphorpsum.com/paragraphs/1')).data
        setData(text)
    }

    function divideTextInLines() {
        
        let lines: Line[] = [];
        let currentLine = "";
        let cumulativeCharacters= 0;
        const containerWidth = document.getElementById("typing-container")?.offsetWidth;

        console.log(containerWidth)

        for (let i = 0; i < data.words.length; i++) {
            const word = data.words[i].word;
            const lineWithWord = currentLine ? currentLine + " " + word : word;
            const lineWidth = getTextWidth(lineWithWord);

            if (containerWidth && lineWidth <= containerWidth) {
                currentLine = lineWithWord;
            } else {
                lines.push({
                    line: currentLine,
                    cumulativeCharacters
                });
                let lineAbsoluteIndexes = [];
                for (let j = 0; j < currentLine.length; j++) {
                    lineAbsoluteIndexes.push(cumulativeCharacters + j);
                }
                data.absoluteLetterIndexex.push(lineAbsoluteIndexes);
                cumulativeCharacters += currentLine.length;
                currentLine = word;
            }
        }

        if (currentLine) {
            lines.push({
                line: currentLine,
                cumulativeCharacters
            });
            let lineAbsoluteIndexes = [];
            for (let j = 0; j < currentLine.length; j++) {
                lineAbsoluteIndexes.push(cumulativeCharacters + j);
            }
            data.absoluteLetterIndexex.push(lineAbsoluteIndexes);
        }

        return lines;
    }

    function getTextWidth(text: string) {
        const container = document.getElementById("typing-container");
        const span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";
        span.innerText = text;
        container?.appendChild(span);
        const width = span.offsetWidth;
        container?.removeChild(span);
        return width;
    }

    function absoluteLetterIndex( lineIndex: number, letterIndex: number){
        return data.lines[lineIndex].cumulativeCharacters + letterIndex;
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

    #typing-container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        width: 80rem;
        max-width: 90%;
    }
</style>