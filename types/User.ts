export interface TypingTestResult {
    user_id: number;
    words_per_minute: number;
    accuracy: number;
    duration_seconds: number;
    created_at: string
}

export interface User {
    id: number | null;
    name: string;
    email: string;
    typing_test_results: TypingTestResult[];
    analytics: {
        max_wpm: number;
        average_wpm: number;
        average_accuracy: number;
        number_of_tests: number;
        position: number;
    };
}