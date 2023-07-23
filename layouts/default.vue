<template>
    <div class="container">
        <div class="header">
            <div class="title">Capybara Type</div>
            <img class="header-logo" src="~/assets/images/capy_logo.png">
        </div>
    </div>
    
    <slot />
</template>

<script setup>

</script>

<style lang="css" scoped>

.header{
    width: 100vw;
    height: 3rem;
    margin: 0 auto;
    padding: 2rem  0;
    border-radius: 2rem;
    position: fixed;

    display: flex;
    justify-content:center;
    align-items: center;
}

.container{
    width: 70vw;
    display: flex;
}

.title{
    font-size: 4rem;
    color: rgb(255, 255, 255);
    font-family: "TiltNeon";
}

.header-logo{
    background-color: white;
    border-radius: 15px;
    margin: 0 1rem;
    padding: 0.2rem;
    height: 4rem;
}
</style>