<template>
    <div>
        <div class="header">
            <div class="logo" @click="$router.push('/')">
                <div class="title">Typingbara</div>
                <img class="header-logo" src="~/assets/images/capy_logo.png">
            </div>
            <div class="options">
                <div class="button">
                    <div class="tooltip">Mystery</div>
                    <font-awesome-icon class="iconButton multiplayer-icon"  @click="multiplayerHandler" :icon="['fas', 'gamepad']" />
                </div>
                <div class="button">
                    <div class="tooltip">Profile</div>
                    <font-awesome-icon class="iconButton" @click="profileHandler" :icon="['fas', 'user']" />
                </div>

                <div class="button">
                    <div class="tooltip">Leaderboard</div>
                    <font-awesome-icon class="iconButton" @click="$router.push('/leaderboard')" :icon="['fas', 'ranking-star']" />
                </div>
            </div>
        </div>
    </div>
    
    <div class="main-container">
        <slot />
    </div>
    
</template>

<script setup>
    const { $router, $axios } = useNuxtApp();
    function profileHandler(){
        if(localStorage.getItem('token')){
            $router.push('/user');
        }else{
            $router.push('/login')
        }
    }

    async function multiplayerHandler(){
        const gameId = (await $axios.post('/game')).data.data.game_id;
        $router.push(`/match/${gameId}`);
    }


</script>

<style lang="css" scoped>


.header{
    width: 100vw;
    height: 20vh;
    margin: 0 auto;
    padding: 2rem 10%;
    position: fixed;
    top: 0;
    left: 0;

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

.multiplayer-icon{
    animation: rainbow 1.2s linear infinite;
}

@keyframes rainbow{
		100%,0%{
			color: rgb(255,0,0);
		}
		8%{
			color: rgb(255,127,0);
		}
		16%{
			color: rgb(255,255,0);
		}
		25%{
			color: rgb(127,255,0);
		}
		33%{
			color: rgb(0,255,0);
		}
		41%{
			color: rgb(0,255,127);
		}
		50%{
			color: rgb(0,255,255);
		}
		58%{
			color: rgb(0,127,255);
		}
		66%{
			color: rgb(0,0,255);
		}
		75%{
			color: rgb(127,0,255);
		}
		83%{
			color: rgb(255,0,255);
		}
		91%{
			color: rgb(255,0,127);
		}
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
    box-sizing: border-box;
    margin-top: 20vh;
}
</style>