import { defineStore } from 'pinia';
import { Word, Result } from 'types/Typing'

export const useTypingStore = defineStore('counter', {
    state: () => ({
      result: {
        wordsPerMinute: 0,
        accuracy: 0,
        time: 30,
        correctCharacters: 0,
        wrongCharacters: 0,
      } as Result,
    }),
    getters: {
        
    },
    actions: {

    },
  })