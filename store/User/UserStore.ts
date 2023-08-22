import { TypingTestResult, User } from './../../types/User';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: 0,
      name: '',
      email: '',
      typing_test_results: [] as TypingTestResult[],
      analytics: {
        max_wpm: 0,
        average_wpm: 0,
        average_accuracy: 0,
        number_of_tests: 0,
      },
    } as User,
  }),
});