<template>
    <div class="container">
        <div class="title">
            <h1>Editar Proyecto</h1>
        </div>
        <div class="content">
            <form @submit.prevent="validateProject">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model="project.nombre"
                        @input="clearError('nombre')" />
                    <span v-if="errors.nombre" class="text-danger">{{ errors.nombre }}</span>
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Estado</label>
                    <select class="form-select" v-model="project.estado" @change="clearError('estado')">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                    <span v-if="errors.estado" class="text-danger">{{ errors.estado }}</span>
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" v-model="project.descripcion"
                        @input="clearError('descripcion')"></textarea>
                    <span v-if="errors.descripcion" class="text-danger">{{ errors.descripcion }}</span>
                </div>
                <div class="buttons">
                    <button type="submit" class="btn btn-primary btn-nuevo">Actualizar</button>
                    <router-link to="/proyectos" class="btn btn-secondary" title="Volver">
                        Volver
                    </router-link>
                    <router-link :to="{ name: 'Tarea', params: { projectId: Number(project.id) } }"
                        class="btn btn-primary btn-tarea" title="Tareas del Proyecto">
                        Tareas
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
        projectId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            NProjectId: null,
            errors: {
                nombre: '',
                estado: '',
                descripcion: '',
            },
        };
    },
    mounted() {
        this.NProjectId = parseInt(this.projectId);
        localStorage.setItem('currentProjectName', this.project.nombre);
    },
    computed: {
        ...mapState({
            projects: state => state.projects,
        }),
        project() {
            return this.projects.find(p => p.id === parseInt(this.projectId)) || {};
        },
    },
    methods: {
        ...mapActions(['updateProject']),
        clearError(field) {
            this.errors[field] = '';
        },
        validateProject() {
            this.errors = {
                nombre: '',
                estado: '',
                descripcion: '',
            };

            if (!this.project.nombre) {
                this.errors.nombre = 'El nombre es obligatorio.';
            }
            if (!this.project.estado) {
                this.errors.estado = 'Debes seleccionar un estado.';
            }
            if (!this.project.descripcion) {
                this.errors.descripcion = 'La descripción es obligatoria.';
            }

            if (!this.errors.nombre && !this.errors.estado && !this.errors.descripcion) {
                this.updateProjectInStore();
            }
        },
        updateProjectInStore() {
            const updatedProject = { ...this.project };
            this.updateProject(updatedProject);
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

.btn-tarea {
    background-color: #531780;
    border-color: #f4ba5c;
    color: #f4ba5c;
    transition: background-color .2s, border-color .2s, color .2s;
}

.btn-tarea:hover {
    background-color: #f4ba5c;
    border-color: #290941;
    color: #290941;
}
</style>