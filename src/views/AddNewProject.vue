<template>
  <div class="add-new-project">
    <TopBar /> 
    <NewProject @projectCreated="handleProjectCreated" />
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import NewProject from '@/components/NewProject.vue';

// Defina a interface diretamente aqui
interface ProjectData {
  id: number; // ou string, dependendo de como você está gerando o ID
  name: string;
  description: string;
  imageUrl: string;
  // Adicione outras propriedades conforme necessário
}

// Método para lidar com a criação de um novo projeto
const handleProjectCreated = (projectData: ProjectData) => { // Especifica o tipo do parâmetro
  // Aqui você pode lidar com a lógica após a criação de um projeto
  console.log('Novo projeto criado:', projectData);
  // Você pode despachar uma ação Vuex ou fazer outra lógica necessária
};
</script>

<style scoped>
.add-new-project {
  /* Estilos para o componente AddNewProject */
}
</style>
