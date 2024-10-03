<template>
    <div class="container">
        <div class="title">
            <h1>Distribución de Tareas por Estado</h1>
        </div>
        <div class="content">
            <div class="chart-container" v-if="projectTasks.length > 0">
                <div class="pie-chart">
                    <PieChart :data="data" :options="pieOptions" />
                </div>
                <div class="bar-chart">
                    <BarChart :data="data" :options="barOptions" />
                </div>
            </div>
            <div v-else class="message">
                <p>No hay tareas creadas. Por favor, crea algunas tareas.</p>
                <router-link :to="{ name: 'Tarea', params: { projectId: Number(NProjectId) } }"
                    class="btn btn-primary btn-nuevo" title="Tareas del Proyecto">
                    Crear Tarea
                </router-link>
            </div>
            <div class="button-container">
                <button @click="goBack" class="btn btn-secondary" title="Volver">
                    Volver
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { Pie, Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { mapState } from 'vuex';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

export default {
    name: "GraficaProyecto",
    components: {
        PieChart: Pie,
        BarChart: Bar,
    },
    props: {
        projectId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            NProjectId: null,
        };
    },
    mounted() {
        this.NProjectId = parseInt(this.projectId);
        localStorage.setItem('currentProjectName', this.project.nombre);
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
    computed: {
        ...mapState({
            projects: state => state.projects,
            tasks: state => state.tasks,
        }),
        project() {
            return this.projects.find(p => p.id === this.NProjectId) || {};
        },
        projectTasks() {
            return this.tasks.filter(task => task.id_proyecto === this.NProjectId);
        },
        data() {
            const estadoCounts = this.projectTasks.reduce(
                (acc, task) => {
                    acc[task.estado]++;
                    return acc;
                },
                { 'Pendiente': 0, 'En Progreso': 0, 'Completada': 0 }
            );

            return {
                labels: ['Pendiente', 'En Progreso', 'Completada'],
                datasets: [
                    {
                        label: 'Cantidad',
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        data: [estadoCounts.Pendiente, estadoCounts['En Progreso'], estadoCounts.Completada],
                    },
                ],
            };
        },
        pieOptions() {
            return {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            };
        },
        barOptions() {
            return {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            };
        },
    },
};
</script>

<style scoped>
.chart-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 3rem;
}

.message {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.2rem;
    color: #ff0000;
}

.btn-nuevo {
  background-color: #f4ba5c;
  border-color: #290941;
  color: #290941;
  transition: background-color .2s, border-color .2s, color .2s;
}

.btn-nuevo:hover {
  background-color: #290941;
  border-color: #f4ba5c;
  color: #f4ba5c;
}

@media (max-width: 768px) {
    .pie-chart {
        margin-bottom: 5rem;
    }

    .chart-container {
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .button-container {
        margin-top: 2rem;
    }
}
</style>
