<template>
    <div class="timer-container">
        {{ data.remaining }}
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        time: Number,
        callback: Function
    })

    const data = reactive({
        remaining: props.time || 30,
        interval:  null as NodeJS.Timeout | null
    })

    onMounted(()=>{
        data.interval = setInterval(()=>{
            data.remaining--;
            if(data.remaining === 0){
                if (props.callback) {
                    props.callback();
                }
                clearInterval(data.interval!)
            }
        },1000)
    })

    onUnmounted(() => {
        clearInterval(data.interval!);
    })
</script>

<style scoped>
    .timer-container{
        font-family: 'RobotMono';
        font-size: clamp(1.3rem, 1.2296rem + 0.2254vw, 1.5rem);
        color: rgb(255, 157, 0);
        position: absolute;
        top: 0;
        left: 0;
    }
</style>