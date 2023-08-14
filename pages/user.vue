<template>
    <div class="profile-container">

        <div class="user-container card">
            <img class="round-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
            <div class="username">Giuliano</div>
        </div>
        <div class="info-container card">
            <div class="card-content">
                <form>
                    <input placeholder="Username">
                    <div class="password-container">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Password"
                        >
                        <a @click="togglePasswordVisibility">
                            <font-awesome-icon v-if="showPassword" icon="fa-solid fa-eye" />
                            <font-awesome-icon v-else icon="fa-solid fa-eye-slash" />
                        </a>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };
</script>

<style scoped>
    .card{
        width: 40rem;
    }
    .profile-container{
        display: flex;
        gap:2rem;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;

    }

    .user-container{
        display: flex;
        justify-content:space-around;
        align-items: center;

        .round-image {
            width: 8rem;
            height: 8rem;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .username{
        font-size: 3.5rem;
    }

    .password-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
</style>