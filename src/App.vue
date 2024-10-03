<template>
  <AdminNavbar />
  <RouterView />
  <AdminFooter />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import AdminNavbar from './components/AdminNavbar.vue'
import AdminFooter from './components/AdminFooter.vue'

export default {
  data() {
    return {
      selectedProjectId: null,
    };
  },
  components: {
    AdminNavbar,
    AdminFooter
  },
  methods: {
    selectProject(id) {
      this.selectedProjectId = id;
    },
  },
};
</script>