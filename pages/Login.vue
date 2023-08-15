<template>
    <div class="card">
        <div class="card-content">
            <div class="card-title">{{ data.view }}</div>
            <form>
                <input v-model="data.email" placeholder="Email">
                <input v-model="data.password" placeholder="Password">
                <input v-model="data.confirmPassword" v-if="data.view === 'Register'" placeholder="Confirm Password">
                <div v-if="data.view === 'Login'" class="buttons">
                    <button class="submit-btn">Login</button>
                    <button class="google-button submit-btn">Login with Google<span class="google-icon"></span></button>
                </div>
                <button v-else class="submit-btn">Register</button>
                <div @click="changeView" class="changeViewButton">Don't have a account?</div>
            </form>
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

    .card{
        width: 45rem;
    }

    .card-title{
        color: rgb(255, 255, 255);
        font-size: clamp(1.5rem, 1.2651rem + 1.4458vw, 3rem);
        font-weight: bold;
    }
    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        .submit-btn {
            background-color: #4BB543;
            border: none;
            border-radius: 14px;
            cursor: pointer;
            color: white;
            font-family: RobotMono;
            height: 4rem;
            margin-top: 50px;
            font-size: 1.1rem;
            transition: 0.25s;
            width: 153px;

            &:hover{
                box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.35);
            }
        }
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

    .google-button {
        position: relative;
        overflow: hidden;
        background-color: rgb(146, 146, 146) !important;
    }

    .google-icon {
        position: absolute;
        bottom: -3px; /* Distância do ícone até a borda inferior do botão */
        right: -3px; /* Distância do ícone até a borda direita do botão */
        width: 2rem; /* Largura do ícone */
        height: 2rem; /* Altura do ícone */
        background-image: url('../assets/images/google-icon.png');
        background-size: cover;
        background-position: center;
    }

</style>