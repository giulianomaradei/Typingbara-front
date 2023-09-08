<template>
    <div class="match-container">
        <div v-for="(player, index) in data.players" class="player-container">
            <div class="capy-container">
                <div class="player-name">{{player.name}}</div>
                <img class="player-capy" :style="getPlayerPadding(index)" src="assets/images/capybaraAnimation/ezgif.com-reverse.gif">
            </div>
            <div class="player-wpm">{{ player.wordsPerMinute }} wpm</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Player } from '~/types/Typing'

    const data = reactive({
        players: [] as Player[],
        text: ""
    })

    function getPlayerPadding(index: number){
        return {
            "padding-left": `${data.players[index].progress}px`
        }    
    }
    
    onMounted(()=>{
        data.players.push({
            name: "You",
            progress: 0,
            wordsPerMinute: 0
        });
        data.players.push({
            name: "Player 2",
            progress: 0,
            wordsPerMinute: 0
        })
        data.players.push({
            name: "Player 3",
            progress: 0,
            wordsPerMinute: 0
        })
        data.players.push({
            name: "Player 4",
            progress: 0,
            wordsPerMinute: 0
        })
    })

</script>

<style scoped>
    .match-container{
        width: 60rem;
        max-width: 90vw;

    }
    .player-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;
        width: 100%;
        margin: 1rem 0;
    }

    .capy-container{
        width: 90%;
        border-bottom: 2px dashed white;
        display: flex;
        flex-direction: row;
    }

    .player-name{
        display: flex;
        width: 15%;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        padding: 0.3rem;
        font-size: 1.1rem;
        font-family: RobotMono;
    }

    .player-capy{
        padding: 0;
        height: 6vh;
    }

    
    .player-wpm{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.3rem;
        flex: 1;
        font-family: RobotMono;
    }


    
</style>