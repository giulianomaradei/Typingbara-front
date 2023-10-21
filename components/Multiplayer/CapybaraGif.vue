<template>
    <div class="player-capy-container">
        <img class="player-capy" id="capybara" :style="getPlayerPadding()"  :src="data.src">
    </div>
</template>

<script setup lang="ts">

    import animatedCapybara from '/images/capybaraAnimation/animatedCapybara.gif';
    import staticCapybara from '/images/capybaraAnimation/staticCapybara.png';

    const capybaraGif = ref(null as HTMLImageElement | null);


    const props = defineProps({
        progress : {
            type: Number,
            required: true
        },
    });

    const data = reactive({
        stopAnimationTimeoutId : null as NodeJS.Timeout | null,
        src: staticCapybara,
    });

    defineExpose({
       moveCapybara,
    })


    function getPlayerPadding() {
        const paddingPercentage = (70 * props.progress) / 100;
        return {
            "padding-right": `${70 - paddingPercentage}%`,
        };
    }

    function moveCapybara(){
        clearTimeout(data.stopAnimationTimeoutId!);

        data.stopAnimationTimeoutId =  setTimeout(() => {
            data.src = staticCapybara;
        },300);

        if(data.src == staticCapybara){
            data.src = animatedCapybara;
        }

    }

    onMounted(() => {
        capybaraGif.value = document.getElementById('capybara') as HTMLImageElement;
    });

</script>

<style scoped>
    .player-capy{
      height: 100%;
        float: right;
    }

    @media screen and (max-width: 768px) {
      .player-capy {
        transform: scale(0.8);
      }
    }

    .player-capy-container{
      width: 100%;

    }
</style>
