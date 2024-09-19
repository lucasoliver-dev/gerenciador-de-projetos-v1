<template>
    <div class="toolbar">
      <div class="toolbar-content d-flex justify-content-between align-items-center">
        <div class="project-info">
          <h2>Projetos ({{ totalProjects }})</h2>
        </div>
        <div class="filters d-flex align-items-center">
          <button class="btn btn-toggle-favorites" @click="toggleFavorites">
            <span v-if="showFavorites">Mostrar Todos</span>
            <span v-else>Mostrar Favoritos</span>
          </button>
          
          <select v-model="sortOption" @change="sortProjects">
            <option value="alphabetical">Ordem Alfabética</option>
            <option value="recent">Iniciados Recentemente</option>
            <option value="dueSoon">Próximos ao Prazo</option>
          </select>
  
          <button class="btn btn-new-project" @click="createNewProject">
            Novo Projeto
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'ToolBar',
    props: {
      totalProjects: {
        type: Number,
        required: true,
      }
    },
    setup() {
      const showFavorites = ref(false);
      const sortOption = ref<string>('alphabetical');
  
      const toggleFavorites = () => {
        showFavorites.value = !showFavorites.value;
      };
  
      const sortProjects = () => {
        // Lógica para ordenar os projetos baseado na opção escolhida
        if (sortOption.value === 'alphabetical') {
          // Ordenar alfabeticamente
        } else if (sortOption.value === 'recent') {
          // Ordenar pelos mais recentes
        } else if (sortOption.value === 'dueSoon') {
          // Ordenar pelos projetos mais próximos da data de finalização
        }
      };
  
      const createNewProject = () => {
        // Lógica para criar um novo projeto
        console.log('Criar novo projeto');
      };
  
      return {
        showFavorites,
        sortOption,
        toggleFavorites,
        sortProjects,
        createNewProject,
      };
    }
  });
  </script>
  
  <style scoped>
  .toolbar {
    padding: 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  
  .toolbar-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .project-info h2 {
    font-size: 24px;
    font-weight: 500;
  }
  
  .filters select {
    margin-left: 15px;
    padding: 5px 10px;
  }
  
  .btn-toggle-favorites {
    margin-right: 15px;
  }
  
  .btn-new-project {
    margin-left: 20px;
    padding: 8px 15px;
    background-color: #695ccd;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  