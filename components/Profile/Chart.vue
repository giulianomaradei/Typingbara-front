<template>
    <div>
      <Line class="chart" :data="chartData" :options="chartOptions"></Line>
    </div>
</template>

<script setup lang="ts">
    import { Line } from 'vue-chartjs'
    import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js'
    import * as chartConfig from './chartConfig.js'

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const props = defineProps({
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            required: true
        }
    });
</script>


<style scoped>
    .chart{
        width: 50rem;
    }
</style>