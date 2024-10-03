<template>
    <div class="container">
        <div class="title">
            <h1>Editar Tarea</h1>
        </div>
        <div class="content">
            <form @submit.prevent="validateTask">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model="task.nombre"
                        @input="clearError('nombre')">
                    <span v-if="errors.nombre" class="text-danger">{{ errors.nombre }}</span>
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Estado</label>
                    <select class="form-select" v-model="task.estado" @change="clearError('estado')">
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completada">Completada</option>
                    </select>
                    <span v-if="errors.estado" class="text-danger">{{ errors.estado }}</span>
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" v-model="task.descripcion"
                        @input="clearError('descripcion')"></textarea>
                    <span v-if="errors.descripcion" class="text-danger">{{ errors.descripcion }}</span>
                </div>
                <div class="buttons">
                    <button type="submit" class="btn btn-primary btn-nuevo" title="Actualizar">Actualizar</button>
                    <router-link :to="{ name: 'Tarea', params: { projectId: Number(projectId) } }"
                        class="btn btn-secondary" title="Volver">
                        Volver
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Editar',
    props: {
        taskId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            NtaskId: null,
            projectId: null,
            errors: {
                nombre: '',
                estado: '',
                descripcion: '',
            },
        };
    },
    mounted() {
        this.projectId = localStorage.getItem('currentProjectId') || '';
        this.NtaskId = parseInt(this.taskId);
    },
    computed: {
        ...mapState({
            tasks: state => state.tasks,
        }),
        task() {
            return this.tasks.find(p => p.id === parseInt(this.NtaskId)) || {};
        },
    },
    methods: {
        ...mapActions(['updateTask']),
        clearError(field) {
            this.errors[field] = '';
        },
        validateTask() {
            this.errors = {
                nombre: '',
                estado: '',
                descripcion: '',
            };

            if (!this.task.nombre) {
                this.errors.nombre = 'El nombre es obligatorio.';
            }
            if (!this.task.estado) {
                this.errors.estado = 'Debes seleccionar un estado.';
            }
            if (!this.task.descripcion) {
                this.errors.descripcion = 'La descripción es obligatoria.';
            }

            if (!this.errors.nombre && !this.errors.estado && !this.errors.descripcion) {
                this.updateTaskInStore();
            }
        },
        updateTaskInStore() {
            const updatedTask = { ...this.task };
            this.updateTask(updatedTask);
            this.$router.push({ name: 'Tarea', params: { projectId: Number(this.projectId) } });
        },
    },
};
</script>

<style scoped>
.edit-project {
    padding: 20px;
}

.buttons {
    display: flex;
    justify-content: space-around;
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

.title {
    margin-top: 1.5rem;
    text-align: center;
    color: #4d1478;
}
</style>