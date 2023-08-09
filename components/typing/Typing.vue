<template>
    <div class="typing-container">
        <Timer v-if="data.started" :callback="finished"></Timer>
        <div id="text-container">
            <div v-for="(line, lineId) in displayedLines" :key="lineId">
                <span v-for="(letter, letterId) in line" :key="letterId">
                    <span v-if="data.letterIndex === data.absoluteLetterIndexes[lineId+data.lineIndex][letterId]"  class="text-line" ></span>
                    <span :style="{color: data.colors[data.absoluteLetterIndexes[lineId+data.lineIndex][letterId]]}">{{letter}}</span>
                </span>
            </div>
        </div>
        <font-awesome-icon class="newText" @click="getRandomText" :icon="['fas', 'rotate']" />
    </div>

</template>

<script setup lang="ts">

    import { computed, reactive, onMounted } from 'vue';
    import { useTypingStore } from '../../store/typing/typingStore'
    import { Word, Result } from 'types/typing/index'
    import Timer from './Timer.vue'

    const store = useTypingStore();
    const route = useRoute()
    const { $axios, $router } = useNuxtApp();

    const data = reactive({
        text: "",
        letterIndex: 0,
        wordIndex:0,
        lineIndex: 0,
        colors: [] as string[],
        words: [] as Word[],
        lines: [] as string[],
        absoluteLetterIndexes: [] as number[][],

        started: false,
        result: {
            wordsPerMinute: 0,
            accuracy: 0,
            time: 30,
            correctCharacters: 0,
            wrongCharacters: 0,
        } as Result,
    })

    function finished(){
        const result = data.result;
        data.result.wordsPerMinute = Math.trunc(((result.wrongCharacters + result.correctCharacters)/5)/(result.time/60));
        data.result.accuracy = Math.trunc((100 * result.correctCharacters) / (result.wrongCharacters + result.correctCharacters))
        store.result = data.result;
        $router.push('/result')
    }

    function keyPressed(event: KeyboardEvent){
        const { key } = event;

        const regex = /^[a-zA-Z'.,:?!;()-]$/;

        const currentWord = data.words[data.wordIndex];
        const lastWord = data.words[data.wordIndex-1] ?? null;
        // just for reducing boiler plate from the data word

        if(regex.test(key)){ // if its a normal text letter
            if(!data.started){
                data.started = true;
            }

            if(key === data.text[data.letterIndex]){  // if its the right letter
                data.colors[data.letterIndex] = 'white'
                data.words[data.wordIndex].lettersLeft--;
                data.result.correctCharacters++;
                if(data.letterIndex === data.absoluteLetterIndexes[data.lineIndex+1][data.absoluteLetterIndexes[data.lineIndex+1].length-2]){ // if the letter is the last from the second line (-2 because there is always a empty space in the end)
                    data.lineIndex++;
                }
            }else{
                data.colors[data.letterIndex] = 'red';
                data.result.wrongCharacters++;
            }
            data.words[data.wordIndex].lastWritedIndex = data.letterIndex +1;
            data.letterIndex+=1;
        }else{
            if(key === "Backspace"){

                if(data.letterIndex <= 0 ){ //start of the text cannot go back
                    return;   
                }

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
                        data.result.correctCharacters--;
                    }else if(data.colors[data.letterIndex] === 'red'){
                        data.result.wrongCharacters--;
                    }
                    data.colors[data.letterIndex] = "gray";
                }
            }
            if(key === ' ' && currentWord.start !== data.letterIndex){
                data.letterIndex = data.words[++data.wordIndex].start
                data.result.correctCharacters++;
            }
        }
    }

    async function setData( text: string ){
        let newWords: Word[] = [];
        let word = "";
        let start=0,lastWritedIndes;

        data.letterIndex = 0,
        data.wordIndex = 0,
        data.lineIndex = 0,
        data.absoluteLetterIndexes = [];
        data.started = false;

        for (var i = 0; i < text.length; i++) {
          if(text[i] !== ' '){
            length++;
            word+=text[i];
          }else{
            newWords.push({
              start,
              word,
              lastWritedIndex: start,
              index: newWords.length,
              lettersLeft: length
            });
            start = i+1;
            word = "";
          }
        }
        data.words = newWords;
        data.text = text
        data.lines = await divideTextInLines();
        data.colors = (new Array(data.text.length).fill('gray'))
    }

    async function getRandomText() {
        const text = (await $axios.get('https://random-word-api.vercel.app/api?words=200')).data;
        const cleanedText = text
            .join(" ")
            .replace(/\n/g, ' ')
            .replace(/[^a-zA-Z ]/g, '')
            .toLowerCase()
            .split(' ')
            .filter((word: string) => word.length <= 6)
            .join(' ');

        setData(cleanedText);
    }



    async function divideTextInLines() {
        
        let lines: string[] = [];
        let currentLine = "";
        let cumulativeCharacters= 0;
        const containerWidth = document.getElementById("text-container")?.offsetWidth;


        for (let i = 0; i < data.words.length; i++) {
            const word = data.words[i].word;
            const lineWithWord = currentLine ? currentLine + " " + word : word;
            const lineWidth = await getTextWidth( lineWithWord );

            if (containerWidth && lineWidth < containerWidth) {
                currentLine = lineWithWord;
            } else {
                currentLine+= " ";
                lines.push(currentLine);
                
                let lineAbsoluteIndexes = [];
                for (let j = 0; j < currentLine.length; j++) {
                    lineAbsoluteIndexes.push(cumulativeCharacters + j);
                }
                data.absoluteLetterIndexes.push(lineAbsoluteIndexes);
                cumulativeCharacters += currentLine.length;
                currentLine = word;
            }
        }

        if (currentLine) {
            currentLine+= " ";
            lines.push(currentLine);
            let lineAbsoluteIndexes = [];
            for (let j = 0; j < currentLine.length; j++) {
                lineAbsoluteIndexes.push(cumulativeCharacters + j);
            }
            data.absoluteLetterIndexes.push(lineAbsoluteIndexes);
        }

        return lines;
    }

    async function getTextWidth(text: string) {
        const container = document.getElementById('text-container');
        const span = document.createElement('span');
        span.innerText = text;
        span.style.whiteSpace = 'nowrap';
        container?.appendChild(span);
        await document.fonts.ready; // Wait for the font to be loaded
        const width = span.offsetWidth;
        container?.removeChild(span);
        return width;
    }
 
    const displayedLines = computed(()=>{
        return data.lines.slice(data.lineIndex, data.lineIndex+3);
    })

    onMounted(()=>{
        window.addEventListener("keydown", keyPressed )
        getRandomText();
    })

</script>

<style lang="scss" scoped>
    #text-container{
        width: 100%;
        font-size: 1.7rem;
        font-family: 'RobotMono';
    }
    .text-line{
        padding: 2px 1px;
        background-color: rgb(255, 0, 0);
        font-size: 1.7rem;
        font-weight: bold;
    }

    .newText{
        cursor: pointer;
        
        &:hover {
            color: darken(#ffffff, 15%); /* Cor um pouco mais escura quando o cursor estiver em cima */
        }
    }

    .typing-container{
        width: 80rem;
        max-width: 90%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    }

</style>