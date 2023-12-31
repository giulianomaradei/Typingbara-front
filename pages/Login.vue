<template>
    <div class="card">
        <div class="card-content">
            <div class="card-title">{{ data.view }}</div>
            <form>
                <input v-if="data.view === 'Register'" v-model="data.name" placeholder="Username">
                <input v-model="data.email" placeholder="Email">

                <div v-if="data.view === 'Login'" class="password-container">
                    <input v-model="data.password" :type="showPassword ? 'text' : 'password'" placeholder="Password">
                    <a @click="togglePasswordVisibility">
                        <font-awesome-icon v-if="showPassword" icon="fa-solid fa-eye" />
                        <font-awesome-icon v-else icon="fa-solid fa-eye-slash" />
                    </a>
                </div>


                <input v-if="data.view === 'Register'" v-model="data.password" :type="'password'" placeholder="Password">
                <input v-if="data.view === 'Register'" v-model="data.confirmPassword" :type="'password'" placeholder="Confirm Password">

                <div v-if="data.error" class="error">{{ data.error }}</div>

                <div class="buttons">
                    <button @click.prevent="loginHandler" v-if="data.view === 'Login'" class="submit-btn">Login</button>
                    <!--<button v-if="data.view === 'Login'" class="google-button submit-btn">Login with Google<span class="google-icon"></span></button>-->
                    <button @click.prevent="registerHandler" v-if="data.view === 'Register'" class="submit-btn">Register</button>
                </div>
                <div @click="changeView" class="changeViewButton">{{ (data.view === 'Login') ? "Don't have an account?" : "Already have an account"}}</div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref } from 'vue';
    import { useUserStore } from '~/store/User/UserStore';
    const { $router, $axios } = useNuxtApp();

    const userStore = useUserStore();
    const showPassword = ref(false);

    const data = reactive({
        view: 'Login',
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: ""
    });

    function changeView(){
        data.view = data.view === 'Login' ? 'Register' : 'Login';
        data.email = "";
        data.password = "";
        data.confirmPassword = ""
    }

    function setErrorText(error : string){
        data.error = error;
        setTimeout(()=>{
            data.error = "";
        },1300);
    }

    async function loginHandler() {
        try {
            const response = (await $axios.post('/auth/login', {
                email: data.email,
                password: data.password
            })).data;

            if(response.token){
                localStorage.setItem('token', response.token);

                const user = (await $axios.get('/user')).data.data;
                userStore.user = user;

                $router.push('/user');
            }
        } catch (err: any) {
            setErrorText(err.response.data.message);
        }

    }

    async function registerHandler() {
        try {
            const response = (await $axios.post('/auth/register', {
                name: data.name,
                email: data.email,
                password: data.password,
                confirm_password: data.confirmPassword
            })).data;

            if(response.token){
                localStorage.setItem('token', response.token);

                const user = (await $axios.get('/user')).data.data;
                userStore.user = user;

                $router.push('/user');
            }
        } catch (err: any) {
            setErrorText(err.response.data.message);
        }
    }

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };

</script>

<style lang="scss" scoped>

    .card{
        width: 40rem;
    }

    .card-title{
        color: rgb(255, 255, 255);
        font-size: clamp(1rem, 0.812rem + 1.1566vw, 2.2rem);
        font-weight: bold;
    }

    .password-container {
        display: flex;
        align-items: center;
        gap: 1rem;
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
            height: clamp(2.5rem, 2.2651rem + 1.4458vw, 4rem);
            margin-top: 50px;
            transition: 0.25s;
            width: 153px;
            font-size: clamp(0.8rem, 0.753rem + 0.2892vw, 1.1rem);

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
        background-image: url('/images/google-icon.png');
        background-size: cover;
        background-position: center;
    }

    .error{
        align-self: center;
        color: rgb(255, 0, 0);
    }

</style>
