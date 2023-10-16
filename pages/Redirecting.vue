<template>
    <div class="waiting-container">
        <div class="alert">Redirection you to new game...</div>
        <img class="capybaraGif" src="/images/waitingCapybara.gif"> 
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="css" scoped>
    .alert{
        font-size: clamp(0.8rem, 0.5778rem + 1.1852vw, 2rem);
        animation: blink 1s infinite;
    }

    .waiting-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .capybaraGif{
        width: 10vw;
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }

    }
</style>