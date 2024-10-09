<template>
  <div class="add-new-project">
    <TopBar />
    <NewProject @projectCreated="handleProjectCreated" />
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import NewProject from '@/components/NewProject.vue';

interface ProjectData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// Método para lidar com a criação de um novo projeto
const handleProjectCreated = (projectData: ProjectData) => {
  console.log('Novo projeto criado:', projectData);
};
</script>

<style scoped></style>
