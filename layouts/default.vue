<template>
    <div>
        <div class="header">
            <div class="logo" @click="this.$router.push('/')">
                <div class="title">Typingbara</div>
                <img class="header-logo" src="~/assets/images/capy_logo.png">
            </div>
            <div class="options">
                <font-awesome-icon class="iconButton" @click="this.$router.push('/login')" :icon="faUser" />
                <font-awesome-icon class="iconButton" :icon="faGear" />
            </div>
        </div>
    </div>
    
    <div class="main-container">
        <slot />
    </div>
    
</template>

<script setup>
    import { faUser, faGear } from '@fortawesome/free-solid-svg-icons';
</script>

<style lang="css" scoped>


.header{
    width: 100vw;
    height: 20vh;
    margin: 0 auto;
    padding: 2rem 10%;


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
    font-size: clamp(1.5rem, 1.0301rem + 2.8916vw, 4.5rem);
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

.main-container{
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>