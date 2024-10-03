import { createRouter, createWebHistory } from 'vue-router'
import AdminHome from '@/components/AdminHome.vue'
import AdminProyecto from '@/components/AdminProyecto.vue'
import EditProyecto from '@/components/EditProyecto.vue'
import AdminTarea from '@/components/AdminTarea.vue'
import EditTarea from '@/components/EditTarea.vue'
import GraficaProyecto from '@/components/GraficaProyecto.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminHome
    },
    {
      path: '/proyectos',
      name: 'Proyectos',
      component: AdminProyecto
    },
    {
      path: '/proyectos/editar/:projectId',
      name: 'Editar',
      component: EditProyecto, 
      props: true
    },
    {
      path: '/proyectos/:projectId/grafica',
      name: 'Grafica',
      component: GraficaProyecto, 
      props: true
    },
    {
      path: '/tareas/:projectId',
      name: 'Tarea',
      component: AdminTarea, 
      props: true
    },
    {
      path: '/tareas/editar/:taskId',
      name: 'EditarTarea',
      component: EditTarea, 
      props: true
    }
  ]
})

export default router
