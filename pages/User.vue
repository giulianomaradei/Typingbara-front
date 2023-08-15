<template>
    <div class="profile-container">

        <div class="user-container card">
            <img class="round-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
            <div class="username">Giuliano</div>
        </div>
        <div class="card statistcs-container">
            <div class="rank"><span><font-awesome-icon class="icon" icon="fa-solid fa-crown" /></span> 2nd place</div>
            <div class="statistcs">
                <div><span>MAX WPM:</span> 124</div>
                <div><span>AVG WPM:</span> 112</div>
                <div><span>AVG ACC:</span> 87%</div>
                <div><span>TOTAL TESTS:</span> 34</div>
            </div>
        </div>
        
        <chart class="chart" :chartData="chartData" :chartOptions="chartOptions"></chart>
        

    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Chart from '../components/Profile/Chart.vue'

    const showPassword = ref(false);
    const chartData = {
        datasets: [{
            label: "WPM",
            data: [120, 140, 98, 89],
            acc: [80, 92, 75, 88],
            time: [30, 30, 15, 60],
            fill: true,
            borderColor: 'rgb(255, 174, 0)',
            borderWidth: 3,
            pointRadius: 6,
            tension: 0.1,
        }],
        labels: ["2023-02-13", "2023-02-14", "2023-02-15", "2023-02-16"]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Dates',
                    font: {
                        size: 16, // Ajuste o tamanho da fonte para o título do eixo X
                        family: 'RobotMono'
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'WPM',
                    font: {
                        size: 16, // Ajuste o tamanho da fonte para o título do eixo X
                        family: 'RobotMono'
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: (context: any) => {
                        const wpm = `- WPM: ${context.parsed.y}`;
                        const acc = `- ACC: ${context.dataset.acc[context.dataIndex]}%`;
                        const time = `- Time: ${context.dataset.time[context.dataIndex]}s`;
                        return [wpm, acc, time];
                    }
                },
                displayColors: false,
                bodyFont: {
                    size: 17,
                    family: 'RobotMono'
                }
                
            },
            legend: {
                display: false // Oculta a exibição da legenda
            }
        }
    }

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };
</script>

<style scoped lang="scss">
    .card{
        padding: 20px;
    }
    .profile-container{
        display: flex;
        gap: clamp(1rem, 0.6479rem + 1.1268vw, 2rem);
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        width: 90rem;
        max-width: 95vw;
    }

    .user-container{
        display: flex;
        justify-content:center;
        align-items: center;
        flex-grow: 1;
        margin: 0;
        gap: 20px;
        height: clamp(4rem, 3.0602rem + 5.7831vw, 10rem);
        .round-image {
            width: clamp(3rem, 2.2169rem + 4.8193vw, 8rem);
            height: clamp(3rem, 2.2169rem + 4.8193vw, 8rem);
            border-radius: 50%;
            object-fit: cover;
        }
        .username{
            font-size: clamp(1.5rem, 1.1867rem + 1.9277vw, 3.5rem);
        }
    }

    .statistcs-container{
        display: flex;
        flex-direction: row;
        flex-grow: 3;
        justify-content: center;
        align-items: center;
        position: relative;
        gap: 5%;
        margin: 0;
        height: clamp(7rem, 6.5301rem + 2.8916vw, 10rem);;

        .statistcs{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 10% 5%;
        }

        div{
            font-size: clamp(0.9rem, 0.8217rem + 0.4819vw, 1.4rem);
            span{
                color: rgb(255, 174, 0);
                font-size: clamp(0.9rem, 0.8217rem + 0.4819vw, 1.4rem);
                font-weight: bold;
            }
        }

        .rank{
            position: absolute;
            top: 10px;
            left: 10px;
        }
    }

    .chart{
        width: 100%;
        height: 30vh;
    }
    
</style>