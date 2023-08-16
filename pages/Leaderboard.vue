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
        </div>
    </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped lang="scss">
    .card{
        min-height: 60vh;
        width: 40rem;
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