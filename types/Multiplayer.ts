export interface Player {
    id: number,
    name: string,
    progress: number,
    wordsPerMinute: number,   
    start: null | number
    position: null | number,
}

export interface TextSent{
    text: string,
}

export interface PlayerTyping{
    player: Player,
}

export interface PlayerFinished{
    player: Player,
}

export interface GameFinished{
    newGameId: string

}
