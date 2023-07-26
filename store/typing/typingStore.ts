import { defineStore } from 'pinia';
import { Word } from './types';

export const useTypingStore = defineStore('counter', {
    state: () => ({
         text: "",
         letterIndex: 0,
         wordIndex:0,
         colors: [] as string[],
         words: [] as Word[]
    }),
    getters: {
        
    },
    actions: {
      setText( text: string){
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
              lastWritedIndex,
              index: newWords.length
            });
            start = i+1;
            word = "";
            length= 0
          }
        }
        this.words = newWords;
        this.text = text
      }
    },
  })