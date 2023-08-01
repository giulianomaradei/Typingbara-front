<template>
    <div class="timer-container">
        {{ data.remaining }}
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
</script>

<style scoped>
    .timer-container{
        align-self: self-start;
        font-family: 'RobotMono';
        font-size: 1.5rem;
        color: rgb(255, 157, 0);
    }
</style>