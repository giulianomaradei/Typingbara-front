<template>
    <div>
        <div class="header">
            <div class="logo">
                <div class="title">Capybara Type</div>
                <img class="header-logo" src="~/assets/images/capy_logo.png">
            </div>
            <div class="options">
                <font-awesome-icon :icon="['fas', 'user']" />
                <font-awesome-icon :icon="['fas', 'gear']" />
            </div>
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
    height: 7rem;
    margin: 0 auto;
    padding: 2rem 12rem;

    position: fixed;
    display: flex;
    justify-content:space-between;
    align-items: center;
    box-sizing: border-box;
}

.logo{
    display: flex;
}

.options{
    display: flex;
   gap: 2rem;
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