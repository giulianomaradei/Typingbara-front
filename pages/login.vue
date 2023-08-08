<template>
    <div class="container">
        <div class="card">
            <div class="card-content">
                <div class="card-title">{{ data.view }}</div>
                <form>
                    <input v-model="data.email" placeholder="Email">
                    <input v-model="data.password" placeholder="Password">
                    <input v-model="data.confirmPassword" v-if="data.view === 'Register'" placeholder="Confirm Password">
                    <div v-if="data.view === 'Login'" class="buttons">
                        <button class="submit-btn">Login</button>
                        <button class="submit-btn">Login with Google</button>
                    </div>
                    <button v-else class="submit-btn">Register</button>
                    <div @click="changeView" class="changeViewButton">Dont have a account?</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const data = reactive({
        view: 'Login',
        email: "",
        password: "",
        confirmPassword: ""
    });

    function changeView(){
        data.view = data.view === 'Login' ? 'Register' : 'Login';
    }
</script>

<style lang="scss" scoped>
    .card {
        background: #565656;
        border-radius: 8px;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);

        margin: 6rem auto 8.1rem auto;
        width: 27rem;
        max-width: 80%;
    }

    .card-content {
        padding: 12px 44px;
    }

    .card-title {
        font-family: RobotMono;
        font-size: clamp(1.2rem, 0.9183rem + 0.9014vw, 2rem);
        letter-spacing: 4px;
        padding-bottom: 23px;
        padding-top: 13px;
        text-align: center;
    }

    .buttons{
        display: flex;
        gap: 5px;
    }

    .submit-btn {
        background: rgb(107, 107, 107);
        border: none;
        border-radius: 14px;
        cursor: pointer;
        color: white;
        font-family: RobotMono;
        height: 42.3px;
        margin: 0 auto;
        margin-top: 50px;
        transition: 0.25s;
        width: 153px;

        &:hover{
            box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.35);
        }
    }

    form{
        display: flex;
        align-items: left;
        flex-direction: column;
    }

    input:hover {
        border-bottom: 1px solid #ffffff;
    }

    input:focus {
        border-bottom: 1px solid #ffffff;
    }

    .changeViewButton{
        align-self: center;
        margin-top: 10px;
        cursor: pointer;
        text-decoration: underline;

        &:hover{
            color: #d1d1d1;
        }
    }


    input {
        margin: 20px 0;
        padding: 10px;
        width: 90%;
        border: none;
        outline: none;
        border-bottom: 1px solid #d1d1d1;
        color: white;
        font-size: clamp(1rem, 0.9296rem + 0.2254vw, 1.2rem);
        font-family: RobotMono;
        background-color: transparent;
    }

</style>