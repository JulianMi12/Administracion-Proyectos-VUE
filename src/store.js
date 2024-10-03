import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            projects: JSON.parse(localStorage.getItem('projects') || '[]'),
            tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
        };
    },
    mutations: {
        addProject(state, project) {
            state.projects.push(project);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        updateProject(state, updatedProject) {
            const index = state.projects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) {
                state.projects.splice(index, 1, updatedProject);
                localStorage.setItem('projects', JSON.stringify(state.projects));
            }
        },
        deleteProject(state, projectId) {
            state.projects = state.projects.filter(task => task.id !== projectId);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        addTask(state, task) {
            state.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask(state, updatedTask) {
            const index = state.tasks.findIndex(p => p.id === updatedTask.id);
            if (index !== -1) {
                state.tasks.splice(index, 1, updatedTask);
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        deleteTask(state, taskId) {
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
    actions: {
        addProject({ commit }, project) {
            commit('addProject', project);
        },
        updateProject({ commit }, project) {
            commit('updateProject', project);
        },
        deleteProject({ commit }, projectId) {
            commit('deleteProject', projectId);
        },
        addTask({ commit }, task) {
            commit('addTask', task);
        },
        updateTask({ commit }, task) {
            commit('updateTask', task);
        },
        deleteTask({ commit }, taskId) {
            commit('deleteTask', taskId);
        },
    },
    getters: {
        allProjects(state) {
            return state.projects;
        },
        allTasks(state) {
            return state.tasks;
        },
    },
});

export default store;
