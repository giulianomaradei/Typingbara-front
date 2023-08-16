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
                    <span>{{ record.wpm }}</span>
                    <span class="wpm-unit"> wpm</span>
                </div>
            </div>
            <div class="pagination">
                <button @click="data.pagination.page--" :disabled="data.pagination.page === 1">Previous</button>
                <span>Page {{ data.pagination.page }}</span>
                <button @click="data.pagination.page++" :disabled="data.pagination.page * data.pagination.take >= recorderList.length">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const { $axios } = useNuxtApp();
    import { LeaderboardService } from '~/Services/LeaderboardService';

    const data = reactive({
        leaderboardList: [] as { wpm: string; name: string }[],
        pagination: {
            page: 1,
            take: 4
        }
    })

    const recorderList = [
        { name: 'Eva', wpm: '140' },
        { name: 'Giuliano', wpm: '124' },
        { name: 'Sophia', wpm: '115' },
        { name: 'Alice', wpm: '110' },
        { name: 'Liam', wpm: '105' },
        { name: 'Bob', wpm: '95' },
        { name: 'Daniel', wpm: '85' },
    ];

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

    async function fetchData() {
        try {
            const skip = (data.pagination.page - 1) * data.pagination.take;
            const take = data.pagination.take;
            const response = await LeaderboardService.getRecords(skip, take);
            data.leaderboardList = response.data;
        } catch (error) {
            // Lidar com erros aqui
        }
    }
    
    onMounted(()=>{
        //fetchData();
    })

</script>

<style scoped lang="scss">

    .card{
        min-height: 60vh;
        width: 40rem;
    }

    .card-content{
        height: 100%;
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

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
    }

    .pagination button {
        padding: 0.5rem 1rem;
        background-color: #3490dc;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 0 0.5rem;
    }

    .pagination button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    @media (max-width: 560px) {
       .wpm-unit {
           display: none;
       }
   }
    
</style>