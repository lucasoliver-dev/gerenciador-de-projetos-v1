<template>
    <div class="add-project-list">
      <TopBar @search="filterProjects" />
      <ProjectList :projects="projects" :searchTerm="searchTerm" />
    </div>
  </template>
  
  <script setup lang="ts">
  import TopBar from '@/components/TopBar.vue';
  import ProjectList from '@/components/ProjectList.vue';
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  
  // Usar Vuex para obter projetos armazenados
  const store = useStore();
  const projects = computed(() => store.getters.getProjects);
  
  // Definindo um termo de pesquisa para filtrar projetos
  const searchTerm = ref('');
  
  // Método para filtrar projetos
  const filterProjects = (term: string) => {
    searchTerm.value = term;
  };
  </script>
  
  <style scoped>
  .add-project-list {
    padding: 20px;
    background-color: #f4f5f7; /* cor de fundo opcional */
    min-height: 100vh; /* para garantir que a view ocupe toda a altura */
  }
  </style>
  