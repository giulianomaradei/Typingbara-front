<template>
    <div class="link" @click="copyLinkToClipboard">
      <div>{{ link }}</div>
      <font-awesome-icon  :icon="['fas', 'fa-copy']" />
    </div>

</template>

<script setup lang="ts">
    
    const props = defineProps({
        gameId: {
            type: String,
            required: true
        }
    });


    function copyLinkToClipboard(){
        const link = `localhost:3000/game/${props.gameId}`;
        navigator.clipboard.writeText(link);
    }

    const link = `localhost:3000/game/${props.gameId}`;
</script>

<style scoped>
    .link{
        cursor: pointer;
        padding: 0.5rem;
        background-color:#3b3b3b;
        border-radius: 0.5rem;
        border: 1px solid gold;
        margin: 10px;


        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .link:hover{
        background-color: #4b4b4b;
    }

    .link:active{
         animation: blink 0.5s linear;
    }

    @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>