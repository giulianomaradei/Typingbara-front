export interface Word {
    start: number
    lastWritedIndex: number
    length: number
    word: string,
    index: number
    lettersLeft: number
}

export interface Line {
    line: string
    cumulativeCharacters: number
}