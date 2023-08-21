import { defineStore } from 'pinia';

export const useUserStore = defineStore('counter', {
    state: () => ({
      user: {
        id: null
      }
    }),
    getters: {
        
    },
    actions: {

    },
  })