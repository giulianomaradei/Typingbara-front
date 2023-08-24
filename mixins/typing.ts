export const typingMixin = {
    data(){
        
    },
    methods:{
        keyPressed( key: string ){
        
            const regex = /^[a-zA-Z'.,:?!;()-]$/;
    
            const currentWord = data.words[data.wordIndex];
            const lastWord = data.words[data.wordIndex-1] ?? null;
            
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
    }
}