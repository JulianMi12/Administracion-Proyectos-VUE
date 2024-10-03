<template>
    <div class="container">
        <div class="title">
            <h1>Gestión de Proyectos</h1>
        </div>
        <div class="home">
            <div class="text">
                <p>Este proyecto es un aplicativo de gestión de proyectos y tareas.</p>
                <p>Permite a los usuarios organizar y
                    hacer seguimiento de sus tareas según el estado de avance.</p>
            </div>
            <ul>
                <li>Crear y gestionar proyectos y tareas</li>
                <li>Seguir el estado de las tareas</li>
                <li>Gráficos interactivos del progreso</li>
            </ul>
            <div class="buttons">
                <router-link to="/proyectos" class="btn btn-primary btn-nuevo" title="Iniciar">
                    Crea un nuevo Proyecto
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminHome',
    mounted() {
        console.log('AdminHome mounted');
    },
};
</script>

<style scoped>
.home p {
    text-align: center;
}

.home ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0px;
    margin: 4rem 0;
}

.home li {
    background-color: rgb(224 219 227 / 50%);
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem;
    height: 70px;
    flex: 1 1 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.btn-nuevo {
    background-color: #f4ba5c;
    border-color: #290941;
    color: #290941;
    transition: background-color .2s, border-color .2s, color .2s;
    width: 60rem;
    margin: 2rem 0;
    display: inline-block;
}

.btn-nuevo:hover {
    background-color: #290941;
    border-color: #f4ba5c;
    color: #f4ba5c;
}

.text {
    margin: 2rem 0;
}

.text p {
    margin-bottom: 0px;
}

@media (max-width: 600px) {
    .home ul {
        align-items: stretch;
        margin: 0px;
    }

    .home li {
        width: 100%;
    }

    .btn-nuevo {
        width: 20rem;
    }
}
</style>