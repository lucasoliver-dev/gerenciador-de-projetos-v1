<template>
    <div class="add-project-list">
        <TopBar @search="filterProjects" />
        <ToolBar @search="filterProjects" @toggle-favorites="toggleFavorites" />
        <ProjectList :projects="filteredProjects" :searchTerm="searchTerm" />
    </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import ToolBar from '@/components/ToolBar.vue';
import ProjectList from '@/components/ProjectList.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const projects = computed(() => store.getters.getProjects);

const searchTerm = ref('');
const showFavorites = ref(false);

const filterProjects = (term: string) => {
    searchTerm.value = term;
};

const toggleFavorites = (isFavorites: boolean) => {
    showFavorites.value = isFavorites;
};

const filteredProjects = computed(() => {
    let filtered = projects.value;

    if (showFavorites.value) {
        filtered = filtered.filter((project) => project.isFavorite);
    }

    if (searchTerm.value) {
        filtered = filtered.filter((project) =>
            project.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
    }

    return filtered;
});
</script>

<style scoped>
.add-project-list {
    padding: 20px;
    background-color: #f4f5f7;
    min-height: 100vh;
}
</style>