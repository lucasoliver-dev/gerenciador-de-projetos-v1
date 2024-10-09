import { createStore } from 'vuex';

interface Project {
  id: number;
  name: string;
  imageUrl: any;
}

const store = createStore({
  state: {
    // Inicializa o estado com dados do localStorage ou um array vazio
    projects: JSON.parse(localStorage.getItem('projects') || '[]') as Project[],
  },
  mutations: {
    ADD_PROJECT(state, project: Project) {
      state.projects.push(project);
      // Salva no localStorage após adicionar o projeto
      localStorage.setItem('projects', JSON.stringify(state.projects));
      localStorage.setItem(`project_${project.id}_imageUrl`, project.imageUrl);
    },
    UPDATE_PROJECT(state, updatedProject: Project) {
      const index = state.projects.findIndex((p: Project) => p.id === updatedProject.id);
      if (index !== -1) {
        // Atualiza o projeto existente no estado
        state.projects[index] = updatedProject;
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    },
    REMOVE_PROJECT(state, projectId: number) {
      // Remove o projeto do estado
      state.projects = state.projects.filter((p: Project) => p.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(state.projects));
      localStorage.removeItem(`project_${projectId}_imageUrl`);
    },
  },
  actions: {
    addProject({ commit }, project: Project) {
      commit('ADD_PROJECT', project);
    },
    updateProject({ commit }, project: Project) {
      commit('UPDATE_PROJECT', project);
    },
    removeProject({ commit }, projectId: number) {
      commit('REMOVE_PROJECT', projectId);
    },
  },
  getters: {
    getProjects: (state) => state.projects,
  },
});

export default store;
