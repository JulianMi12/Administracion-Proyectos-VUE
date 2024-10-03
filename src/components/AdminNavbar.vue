<template>
  <header>
    <div class="px-3 py-2 border-bottom header">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <router-link to="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <img src="../assets/logo.png" alt="Logo" class="d-block mx-auto mb-1" style="width: 60px; height: 60px;">
          </router-link>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <router-link to="/" class="nav-link text-white" aria-current="page">
                  <div class="icon">
                    <i class="d-block mx-auto mb-1 fa-solid fa-house"></i>
                  </div>
                  Home
              </router-link>
            </li>

            <li>
              <router-link to="/proyectos" class="nav-link text-white">
                  <div class="icon">
                    <i class="d-block mx-auto mb-1 fa-solid fa-city"></i>
                  </div>
                  Proyectos
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AdminNavbar"
};
</script>

<style scoped>
.icon i {
  text-align: center;
  font-size: 20px;
}

.header {
  background-color: #290941;
}

.nav-link {
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 0.7;
}

.text-selected {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity)) !important;
}
</style>