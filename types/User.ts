export interface TypingTestResult {
    user_id: number;
    wpm: number;
    accuracy: number;
    duration_seconds: number;
    created_at: string
}

export interface User {
    id: number;
    name: string;
    email: string;
    typingTestResults: TypingTestResult[];
    analytics: {
        max_wpm: number;
        average_wpm: number;
        average_accuracy: number;
        number_of_tests: number;
    };
}