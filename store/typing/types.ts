export interface Word {
    start: number
    lastWritedIndex?: number
    length: number
    word: string,
    index: number
    lettersLeft: number
    // Outras propriedades, se houver...
  }