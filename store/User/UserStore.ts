import { User } from './../../types/User';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('counter', {
    state: () => ({
      user: null as User | null 
    }),
  })