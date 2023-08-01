export interface Word {
    start: number
    lastWritedIndex: number
    word: string,
    index: number
    lettersLeft: number
}

export interface Result{
    wordsPerMinute: number,
    accuracy: number,
    time: number,
    correctCharacters:number,
    wrongCharacters:number,
}