<template>
    <div>
        <div class="header">
            <div class="logo" @click="this.$router.push('/')">
                <div class="title">Capybara Type</div>
                <img class="header-logo" src="~/assets/images/capy_logo.png">
            </div>
            <div class="options">
                <font-awesome-icon class="iconButton" @click="this.$router.push('/login')" :icon="['fas', 'user']" />
                <font-awesome-icon class="iconButton" :icon="['fas', 'gear']" />
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
    padding: 2rem 10%;

    position: fixed;
    display: flex;
    justify-content:space-between;
    align-items: center;
    box-sizing: border-box;
}

.logo{
    display: flex;
    cursor: pointer;
}

.options{
    display: flex;
}

.title{
    font-size: clamp(2rem, 1.6296rem + 1.9753vw, 4rem);
    color: rgb(255, 255, 255);
    font-family: "TiltNeon";
    @media screen and (max-width: 768px) {
        display: none;
    }
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