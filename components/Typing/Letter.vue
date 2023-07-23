<template>
    <span :style="{color: props.color}">
        <slot></slot>
    </span>
</template>

<script setup>
    const props = defineProps({
        color: String,
    })
</script>

<style lang="scss" scoped>

</style>