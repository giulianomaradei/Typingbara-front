<template>
    <div>
        <div class="header">
            <div class="title">Capybara Type</div>
            <img class="header-logo" src="~/assets/images/capy_logo.png">
        </div>
    </div>
    
    <div class="container">
        <slot />
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>

.header{
    width: 100vw;
    height: 3rem;
    margin: 0 auto;
    padding: 2rem  0;

    position: fixed;
    display: flex;
    justify-content:center;
    align-items: center;
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

.container{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>