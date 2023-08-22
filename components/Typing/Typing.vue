<template>
    <div class="typing-container">

        <Timer v-if="data.started" :callback="finished"></Timer>
        <div class="capslockWarning" v-if="data.capslock">Capslock</div>
        <input v-if="data.isMobile" v-model="data.hiddenInputValue" ref="inputRef" id="hidden-input" type="text" style="position: absolute; opacity: 0">
        <div @click="openMobileKeyboard" id="text-container">
            <div v-for="(line, lineId) in displayedLines" :key="lineId">
                <span v-for="(letter, letterId) in line" :key="letterId">
                    <span v-if="data.letterIndex === data.absoluteLetterIndexes[lineId+data.lineIndex][letterId]"  class="text-line" ></span>
                    <span :style="{color: data.colors[data.absoluteLetterIndexes[lineId+data.lineIndex][letterId]]}">{{letter}}</span>
                </span>
            </div>
        </div>

        <div v-if="!data.text" class="c-loader"></div>
        <div class="button">
            <div class="tooltip">New Text</div>
            <font-awesome-icon class="iconButton" @click="getRandomText" icon="fa-solid fa-rotate" />
        </div>
    </div>

</template>

<script setup lang="ts">

    import { computed, reactive, onMounted, ref, watch } from 'vue';
    import { useTypingStore } from '../../store/Typing/TypingStore'
    import { useUserStore } from '~/store/User/UserStore';
    import { Word, Result } from '~/types/Typing'
    import Timer from './Timer.vue'

    const typingStore = useTypingStore();
    const userStore = useUserStore();
    const { $axios, $router } = useNuxtApp();

    const inputRef = ref<HTMLInputElement | null>(null); 
    
    const data = reactive({
        text: "",
        letterIndex: 0,
        wordIndex:0,
        lineIndex: 0,
        capslock: false,
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

        hiddenInputValue: "",
        isMobile: false,
    })

    async function finished(){
        const result = data.result;
        data.result.wordsPerMinute = Math.trunc(((result.wrongCharacters + result.correctCharacters)/5)/(result.time/60));
        data.result.accuracy = Math.trunc((100 * result.correctCharacters) / (result.wrongCharacters + result.correctCharacters))
        typingStore.result = data.result;
        $axios.post('/user/result/'+userStore.user.id, data.result);
        $router.push('/result')
    }
    
    function openMobileKeyboard() {
        if (inputRef.value) {
            inputRef.value.focus();
        }
    }
    
    watch(() => data.hiddenInputValue, async(newInput, oldInput) =>{
        if(oldInput.length > newInput.length){
            keyPressed("Backspace");
        }else{
            keyPressed(newInput.charAt(newInput.length-1));
        }
    })

    function keydownHandler( event: KeyboardEvent ){
        keyPressed( event.key )
    }

    function keyPressed( key: string ){
        
        const regex = /^[a-zA-Z'.,:?!;()-]$/;

        const currentWord = data.words[data.wordIndex];
        const lastWord = data.words[data.wordIndex-1] ?? null;
        
        console.log(key);
        
        if(regex.test(key)){ // if its a normal text letter
            data.capslock = /^[A-Z]$/.test(key)
            
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

            if(key === 'CapsLock'){
                data.capslock = data.capslock ? false : true;
                console.log(data.capslock)
            }

            if(key === ' ' && currentWord.start !== data.letterIndex){
                data.letterIndex = data.words[data.wordIndex + 1].start
                data.wordIndex++;
                data.result.correctCharacters++;
            }
        }
    }

    async function getRandomText() {
        const response = (await $axios.get('https://random-word-api.vercel.app/api?words=200')).data;
        
        const cleanedText = response
            .join(" ")
            .replace(/\n/g, ' ')
            .replace(/[^a-zA-Z ]/g, '')
            .toLowerCase()
            .split(' ')
            .filter((word: string) => word.length <= 6)
            .join(' '); 
        await setData(cleanedText);
        
    }

    async function setData( text: string ){
        let newWords: Word[] = [];
        let word = "";
        let start=0;

        data.letterIndex = 0,
        data.wordIndex = 0,
        data.lineIndex = 0,
        data.absoluteLetterIndexes = [] as number[][];
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
        await document.fonts.ready;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
            return Infinity;
        }
        
        context.font = '1.7rem RobotMono'; // Adjust the font size and style as needed
        const width = context.measureText(text).width;
        
        return width;
    }
 
    const displayedLines = computed(()=>{
        return data.lines.slice(data.lineIndex, data.lineIndex+3);
    })

    onMounted(async ()=>{
        window.addEventListener("keydown", keydownHandler )
        inputRef.value = document.querySelector('#hidden-input');
        data.isMobile = window.innerWidth < 765
        if(!userStore.user.id){
            userStore.user = (await $axios.get('/user')).data.data;
        }
        getRandomText();
    })

    onUnmounted(()=>{
        window.removeEventListener("keydown", keydownHandler)
    })

</script>

<style lang="scss" scoped>
    #text-container{
        width: 100%;
        font-size: 1.7rem;
        font-family: 'RobotMono';
        @media screen and (max-width: 768px) {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
    .text-line{
        padding: 2px 1px;
        background-color: rgb(255, 0, 0);
        font-size: 1.7rem;
        font-weight: bold;
    }

    .capslockWarning{
        color: black;
        background-color: #ffcc00;
        padding: 10px;
        border-radius: 10px;
        top: 0;
        right: 0;
        position: absolute;
    }


    @keyframes is-rotating {
        to {
            transform: rotate(1turn);
        }
    }
    .typing-container{
        position: relative;
        width: 80rem;
        height: 20rem;
        max-width: 90%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    }

</style>