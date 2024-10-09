<template>
    <div class="tool-bar d-flex justify-content-between align-items-center" style="height: 10vh;">
      <input
        type="text"
        v-model="searchTerm"
        @input="searchProjects"
        placeholder="Buscar projetos..."
        class="form-control me-2"
        style="flex: 1; max-width: 40%;"
      />
  
      <div class="d-flex align-items-center" style="width: 60%;">
        <div class="form-check form-switch me-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="favoritesToggle"
            v-model="isFavorites"
            @change="toggleFavorites"
            aria-label="Mostrar favoritos"
          />
          <label class="form-check-label" for="favoritesToggle">
            <span v-if="isFavorites">Favoritos Ativados</span>
            <span v-else>Mostrar Favoritos</span>
          </label>
        </div>
  
        <select v-model="sortOption" class="form-select me-2" style="width: 200px;">
          <option value="alfabetica">Alfabética</option>
          <option value="recentes">Iniciados Mais Recentes</option>
          <option value="prazo">Prazo Mais Próximo</option>
        </select>
        <button @click="goToNewProject" class="add-project-btn d-flex align-items-center justify-content-center small-button" aria-label="Adicionar Novo Projeto">
          <svg class="btn-background" xmlns="http://www.w3.org/2000/svg" width="150" height="40" viewBox="0 0 230 52" fill="none">
            <path d="M0 26C0 11.6406 11.6406 0 26 0H204C218.359 0 230 11.6406 230 26C230 40.3594 218.359 52 204 52H26C11.6406 52 0 40.3594 0 26Z" fill="#695CCD"/>
          </svg>
          <i class="bi bi-plus-circle add-icon"></i> 
          <span class="btn-text">Novo Projeto</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, defineEmits } from 'vue';
  
  const emit = defineEmits<{
    (event: 'search', term: string): void;
    (event: 'toggle-favorites', isFavorites: boolean): void;
  }>();
  
  const searchTerm = ref('');
  const sortOption = ref('alfabetica');
  const isFavorites = ref(false);
  
  const getFavoritesState = () => {
    const favoritesState = localStorage.getItem('isFavorites');
    return favoritesState ? JSON.parse(favoritesState) : false;
  };
  
  const setFavoritesState = (state: boolean) => {
    localStorage.setItem('isFavorites', JSON.stringify(state));
  };
  
  onMounted(() => {
    isFavorites.value = getFavoritesState();
  });
  
  const searchProjects = () => {
    if (searchTerm.value.trim()) {
      emit('search', searchTerm.value);
    }
  };
  
  const goToNewProject = () => {
    window.location.href = '/new-project#/new-project'; 
  };
  
  const toggleFavorites = () => {
    isFavorites.value = !isFavorites.value; 
    setFavoritesState(isFavorites.value); 
    emit('toggle-favorites', isFavorites.value); 
  };
  </script>
  
  <style scoped>
  .tool-bar {
    background-color: #f8f9fa;
    padding: 0 20px;
    width: 100%;
  }
  
  .form-check-input {
    width: 40px;
    height: 20px;
    border-radius: 50px;
    background-color: #ccc;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
    appearance: none; 
  }
  
  .form-check-input:checked {
    background-color: #4caf50; 
  }
  
  .form-check-input::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.3s ease;
  }
  
  .form-check-input:checked::before {
    transform: translate(20px, -50%);
  }
  
  .form-check-label {
    margin-left: 10px;
  }
  
  .add-project-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #695ccd;
    color: white;
    border: none;
    border-radius: 26px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    padding: 5px 15px;
    font-size: 14px;
  }
  
  .add-project-btn:hover {
    background-color: #574e99;
  }
  
  .btn-background {
    position: absolute;
    width: 150px;
    height: 40px;
    z-index: -1;
  }
  
  .add-icon {
    margin-right: 8px;
  }
  
  .btn-text {
    font-weight: bold;
  }
  </style>
  