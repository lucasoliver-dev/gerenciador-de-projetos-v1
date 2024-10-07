<template>
  <div>
    <TopBar @search="filterProjects" />
    <div class="projects-list">
      <div v-for="project in filteredProjects" :key="project.id" class="project-card">
        <img :src="project.image" alt="Capa do Projeto" />
        <h3>{{ project.name }}</h3>
        <p>{{ project.client }}</p>
        <p>{{ project.startDate }} - {{ project.endDate }}</p>
      </div>
      <div v-if="filteredProjects.length === 0">
        <p>Nenhum projeto encontrado para "{{ searchTerm }}"</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapGetters } from 'vuex';
  import TopBar from '@/components/TopBar.vue';
  
  export default {
    components: { TopBar },
    data() {
      return {
        searchTerm: '',
        filteredProjects: this.getProjects,
      };
    },
    methods: {
      filterProjects(term) {
        this.searchTerm = term;
        if (term.trim()) {
          this.filteredProjects = this.getProjects.filter(project =>
            project.name.toLowerCase().includes(term.toLowerCase()) ||
            project.client.toLowerCase().includes(term.toLowerCase())
          );
        } else {
          this.filteredProjects = this.getProjects;
        }
      },
    },
    computed: {
      ...mapGetters(['getProjects']),
    },
  };
  </script>
  