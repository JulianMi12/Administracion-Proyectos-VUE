<template>
  <div class="container">
    <div class="title">
      <h1>Tareas para el proyecto {{ projectName }}</h1>
    </div>
    <div class="content">
      <div class="actions">
        <div class="filter">
          <label for="filterEstado">Estado:&nbsp;&nbsp;</label>
          <select v-model="selectedEstado" id="filterEstado" class="form-select est">
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
          <label for="filterNombre" class="ms-3">Nombre:&nbsp;&nbsp;</label>
          <input type="text" id="filterNombre" v-model="searchNombre" class="form-control nam"
            placeholder="Nombre de la tarea" />
        </div>
        <div class="button-container">
          <button class="btn btn-primary btn-nuevo" data-bs-toggle="modal" data-bs-target="#nuevaTarea" title="Nuevo"
            style="margin-right: 1rem;">
            Nuevo&nbsp;&nbsp; <i class="fa-solid fa-plus"></i>
          </button>
          <router-link :to="{ name: 'Grafica', params: { projectId: Number(NProjectId) } }"
            class="btn btn-primary btn-nuevo" title="Mostrar Graficas">
            Grafica&nbsp;&nbsp; <i class="fa-solid fa-chart-simple"></i>
          </router-link>
        </div>
      </div>
      <div class="table-cont" v-if="paginatedTasks.length > 0">
        <table class="table table-hover mt-2 table-bordered table-striped table-hover table-color">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(task, i) in paginatedTasks" :key="task.id">
              <td>{{ i + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ task.nombre }}</td>
              <td>{{ task.estado }}</td>
              <td>
                <div class="edit">
                  <router-link :to="{ name: 'EditarTarea', params: { taskId: Number(task.id) } }"
                    class="btn btn-primary btn-nuevo mar" title="Editar">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </router-link>
                  <button type="button" class="btn btn-primary btn-delete" @click.stop="deleteTask(task.id)"
                    title="Eliminar">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation" class="mt-3">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Anterior</button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <button class="page-link" @click="currentPage = page">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else class="message">
        <p>No hay tareas creadas.</p>
      </div>
      <div class="button-container">
        <router-link to="/proyectos" class="btn btn-secondary">
          Volver
        </router-link>
      </div>
    </div>
  </div>

  <!-- MODAL -->
  <div id="nuevaTarea" class="modal fade" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nueva Tarea</h5>
          <button type="button" class="modal-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="validateTask">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Nombre</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="newTask.nombre" @input="clearError('nombre')">
                <span v-if="errors.nombre" class="text-danger">{{ errors.nombre }}</span>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Estado</label>
              <div class="col-sm-10">
                <select class="form-select" v-model="newTask.estado" @change="clearError('estado')">
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Progreso">En Progreso</option>
                  <option value="Completada">Completada</option>
                </select>
                <span v-if="errors.estado" class="text-danger">{{ errors.estado }}</span>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Descripción</label>
              <div class="col-sm-10">
                <textarea class="form-control" rows="4" v-model="newTask.descripcion"
                  @input="clearError('descripcion')"></textarea>
                <span v-if="errors.descripcion" class="text-danger">{{ errors.descripcion }}</span>
              </div>
            </div>
            <div class="buttons">
              <button type="submit" class="btn btn-primary" title="Guardar">Guardar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" title="Cerrar">Cerrar</button>
            </div>
          </form>
        </div>
        <div class="modal-footer cierre">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    projectId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      NProjectId: null,
      projectName: '',
      newTask: {
        id: null,
        id_proyecto: this.projectId,
        nombre: '',
        estado: '',
        descripcion: '',
      },
      errors: {
        nombre: '',
        estado: '',
        descripcion: '',
      },
      selectedEstado: '',
      searchNombre: '',
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  mounted() {
    this.NProjectId = parseInt(this.projectId);
    this.projectName = localStorage.getItem('currentProjectName') || '';
    localStorage.setItem('currentProjectId', this.NProjectId);
  },
  computed: {
    ...mapState(['tasks']),
    tasksForProject() {
      return this.tasks.filter(task => task.id_proyecto === this.NProjectId);
    },
    filteredTasks() {
      return this.tasksForProject.filter(task => {
        const matchesEstado = this.selectedEstado === '' || task.estado === this.selectedEstado;
        const matchesNombre = task.nombre.toLowerCase().includes(this.searchNombre.toLowerCase());
        return matchesEstado && matchesNombre;
      });
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTasks.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions(['addTask', 'deleteTask']),
    clearError(field) {
      this.errors[field] = '';
    },
    validateTask() {
      this.errors = {
        nombre: '',
        estado: '',
        descripcion: '',
      };

      if (!this.newTask.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.';
      }
      if (!this.newTask.estado) {
        this.errors.estado = 'Debes seleccionar un estado.';
      }
      if (!this.newTask.descripcion) {
        this.errors.descripcion = 'La descripción es obligatoria.';
      }

      if (!this.errors.nombre && !this.errors.estado && !this.errors.descripcion) {
        const taskToAdd = {
          id: Date.now(),
          id_proyecto: this.NProjectId,
          nombre: this.newTask.nombre,
          estado: this.newTask.estado,
          descripcion: this.newTask.descripcion,
        };
        this.addTask(taskToAdd);

        this.newTask = {
          id: null,
          id_proyecto: null,
          nombre: '',
          estado: '',
          descripcion: '',
        };
      }
    },
  },
  watch: {
    projectId(newProjectId) {
      this.newTask.id_proyecto = newProjectId;
    },
  },
};
</script>

<style scoped>
.modal-header {
  background-color: #290941;
  color: white;
}

.modal-close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: .25em .25em;
  color: white;
  border: 0;
  border-radius: .375rem;
  padding: calc(1rem * .5) calc(1rem * .5);
  margin: calc(-.5 * 1rem) calc(-.5 * 1rem) calc(-.5 * 1rem) auto;
  background: transparent;
  display: flex;
  justify-content: center;
}

.modal-close:hover {
  background-color: #360d55;
}

.cierre {
  background-color: #290941;
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

.btn-delete {
  background-color: #f4ba5c;
  border-color: #290941;
  color: #290941;
  transition: background-color .2s, border-color .2s, color .2s;
}

.btn-delete:hover {
  background-color: #ff0000;
  border-color: #f4ba5c;
  color: #f4ba5c;
}

.table-color th {
  background-color: #4d1478;
  color: #ffffff;
}

.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #f1e0ff;
}

.table {
  text-align: center;
}

.edit {
  display: flex;
  justify-content: center;
}

.modal.fade {
  transition: opacity .15s cubic-bezier(1, -0.02, 1, 1);
}

.title {
  margin-top: 1.5rem;
  text-align: center;
  color: #4d1478;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: .5rem;
}

.modal-dialog {
  max-width: 600px;
}

.mar {
  margin-right: .5rem;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter {
  display: flex;
  align-items: center;
}

.est {
  width: 6rem;
}

.nam {
  width: 12rem;
}

.active>.page-link {
  background-color: #531780;
  border-color: #531780;
}

.page-link {
  color: #531780;
}

.page-link:focus {
  outline: 2px solid #f1e0ff;
  box-shadow: none;
}

@media (max-width: 770px) {
  .actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter {
    align-items: baseline;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .est {
    width: 96%;
  }

  .nam {
    width: 96%;
  }
}
</style>