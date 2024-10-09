<template>
  <div class="projects-list">
    <div v-for="project in filteredProjects" :key="project.id" class="project-card">
      <ProjectCard :project="project" @toggle-favorite="handleFavoriteToggle" />
    </div>
    <div v-if="filteredProjects.length === 0">
      <p>Nenhum projeto encontrado para "{{ searchTerm }}"</p>
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ProjectCard,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['getProjects']),
    filteredProjects() {
      // Filtra os projetos com base no termo de pesquisa
      return this.getProjects.filter(project =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    handleFavoriteToggle(projectId, isFavorite) {
      console.log(`Project ${projectId} is ${isFavorite ? 'favorited' : 'not favorited'}`);
      // Emitir evento para o componente pai, se necessário
      this.$emit('toggle-favorite', projectId, isFavorite);
    },
  },
};
</script>

<style scoped>
.projects-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.project-card {
  flex: 1 1 calc(20% - 20px);
}
</style>
