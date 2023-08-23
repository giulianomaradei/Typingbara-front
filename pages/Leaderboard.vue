<template>
    <div class="card">
        <div class="card-content">
            <div class="card-title">Leaderboard</div>
            <div class="row">
                <span>Pos</span>
                <div class="name">Name</div>
                <div>Record</div>
            </div>
            <div
                class="row"
                v-for="(record, index) in recorderList"
                :key="index"
            >
                <span>{{ index + 1 }}°</span>
                <div class="name">
                    <font-awesome-icon
                        :icon="getIcon(index)"
                        :class="getIconClass(index)"
                    />
                    {{ record.name }}
                </div>
                <div class="wpm">
                    <span>{{ record.record }}</span>
                    <span class="wpm-unit"> wpm</span>
                </div>
            </div>
            <div v-if="(recorderList.length === 0)"  class="c-loader-container">
                <div class="c-loader"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';


    const { $axios } = useNuxtApp();


    interface LeaderboardRecord {
        name: string;
        record: string; // You might want to use a more appropriate type for the record
    }

    const recorderList = ref<LeaderboardRecord[]>([]);

    const fetchLeaderboard = async () => {
        try {
            const response = await $axios.get('/user/leaderboard');
            recorderList.value = response.data.data;
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    };

    const getIcon = (index: number) => {
        if (index === 0) {
            return ["fas", "fa-crown"];
        } else if (index === 1) {
            return ["fas", "fa-crown"];
        } else if (index === 2) {
            return ["fas", "fa-crown"];
        }
        return ["fa", "fa-circle"]; // Default icon
    };

    const getIconClass = (index: number) => {
        if (index === 0) {
            return "gold";
        } else if (index === 1) {
            return "silver";
        } else if (index === 2) {
            return "bronze";
        }
        return ""; // Default class
    };


    onMounted(() => {
        fetchLeaderboard();
    });

</script>

<style scoped lang="scss">

    .card{
        min-height: 60vh;
        width: 40rem;
        position: relative;
    }

    .card-content{
        height: 100%;
    }

    .c-loader-container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

   .row {
       display: flex;
       justify-content: space-between;
       width: 100%;
       max-width: 90vw;
       padding: 0.5rem 0;
       border-bottom: 1px solid #ccc;
   }

   .row.header {
       font-weight: bold;
   }

   .name {
       flex: 2;
       margin-left: 1rem;
   }

   .gold {
        color: gold;
    }

    .silver {
        color: silver;
    }

    .bronze {
        color: #cd7f32; /* Bronze color */
    }

    @media (max-width: 560px) {
       .wpm-unit {
           display: none;
       }
   }
    
</style>