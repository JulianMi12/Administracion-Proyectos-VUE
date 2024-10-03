<template>
    <div class="page-container">
        <div class="footer">
            <div class="container">
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3">
                    <div class="col-md-4 d-flex align-items-center">
                        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            <img src="../assets/logo.png" alt="Logo" class="d-block mx-auto mb-1"
                                style="width: 40px; height: 40px;">
                        </a>
                        <span class="mb-3 mb-md-0 text-white">© 2024 Julian Miranda</span>
                    </div>

                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3">
                            <a class="text-white" href="https://github.com/JulianMi12" target="_blank">
                                <div class="icon">
                                    <i class="mx-auto mb-1 fa-brands fa-github"></i>
                                </div>
                            </a>
                        </li>
                        <li class="ms-3">
                            <a class="text-white" href="https://www.linkedin.com/in/julian-miranda-2a276b162/"
                                target="_blank">
                                <div class="icon">
                                    <i class="mx-auto mb-1 fa-brands fa-linkedin"></i>
                                </div>
                            </a>
                        </li>
                        <li class="ms-3">
                            <a class="text-white" href="https://www.instagram.com/_julian_mi_12/" target="_blank">
                                <div class="icon">
                                    <i class="mx-auto mb-1 fa-brands fa-instagram"></i>
                                </div>
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminFooter"
};
</script>

<style scoped>
.page-container {
  /* Evita que el contenido sea ocultado por el footer */
  padding-bottom: 80px; /* Asegúrate de que este valor sea mayor o igual a la altura del footer */
}

.footer {
  background-color: #290941;
  width: 100%;
  height: 80px; /* Define una altura fija para el footer */
  position: fixed;
  bottom: 0;
  left: 0;
  color: white;
  padding: 10px 0;
}

.icon i {
  text-align: center;
  font-size: 25px;
}
</style>