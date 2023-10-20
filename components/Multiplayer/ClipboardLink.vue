<template>
    <div class="link" @click="copyLinkToClipboard">
      <div>{{ link }}</div>
      <font-awesome-icon  :icon="['fas', 'fa-copy']" />
    </div>

</template>

<script setup lang="ts">

    const runtimeConfig = useRuntimeConfig()



    const props = defineProps({
        gameId: {
            type: String,
            required: true
        }
    });


    function copyLinkToClipboard(){
        navigator.clipboard.writeText(link);
    }
    const link = runtimeConfig.public.BASE_URL + `/game/${props.gameId}`;
</script>

<style scoped>
    .link{
        cursor: pointer;
        padding: 0.5rem;
        background-color:#3b3b3b;
        border-radius: 0.5rem;
        border: 1px solid gold;
        margin: 10px;
        font-size: clamp(0.5rem, 0.4074rem + 0.4938vw, 1rem);

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: clamp(0.3rem, 0.1519rem + 0.7901vw, 1.1rem);;
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
