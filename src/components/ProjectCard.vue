<template>
  <div class="card project-card">
    <div class="card-image"
      :style="{ backgroundImage: imageUrl ? `url(${imageUrl})` : `url('/defalt.png')` }">
      <div class="card-actions">
        <button class="favorite-btn" @click="toggleFavorite">
          {{ isFavorite ? '⭐' : '☆' }}
        </button>
        <button class="actions-btn" @click="toggleActionsMenu">⋯</button>
        <div v-if="showActionsMenu" class="actions-menu">
          <button @click="editProject(project.id)">Editar</button>
          <button @click="confirmDelete">Remover</button>
        </div>
      </div>
    </div>

    <div class="card-content">
      <span class="card-title">{{ project?.name }}</span>
      <div class="card-client">Cliente: {{ project?.client }}</div>
      <hr>
      <div class="card-dates">
        <div class="start-date">
          <i class="bi bi-calendar"></i> {{ project?.startDate }}
        </div>
        <div class="end-date">
          <i class="bi bi-calendar"></i> {{ project?.endDate }}
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <ConfirmModal
      v-if="showConfirmation"
      @confirm="deleteProject"
      @cancel="cancelDelete"
      :show="showConfirmation"
      :projectName="project?.name" 
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ConfirmModal from './ConfirmModal.vue'; // Importe seu componente de modal

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
    projectId: {  // Adicionando a prop projectId
      type: String,
      required: true,
    },
  },
  components: {
    ConfirmModal,
  },
  data() {
    return {
      isFavorite: false,
      imageUrl: null,
      showActionsMenu: false,
      showConfirmation: false,
    };
  },
  mounted() {
  console.log('Project ID recebido:', this.projectId);
  if (this.project?.id) {
    const storedImage = localStorage.getItem(`projectImage_${this.project.id}`);
    if (storedImage) {
      this.imageUrl = storedImage;
    } else if (this.project?.imageUrl) {
      this.imageUrl = this.project.imageUrl;
    }
  } else {
    console.warn('O ID do projeto não está disponível.');
  }
},
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$emit('toggle-favorite', this.project.id, this.isFavorite);
    },
    toggleActionsMenu() {
      this.showActionsMenu = !this.showActionsMenu; // Alterna a visibilidade do menu de ações
    },
    confirmDelete() {
      this.showConfirmation = true; // Abre a modal de confirmação
    },
    cancelDelete() {
      this.showConfirmation = false; // Fecha a modal de confirmação
    },
    ...mapActions(['removeProject']), // Mapeia a ação de remoção do Vuex
    deleteProject() {
      this.removeProject(this.project.id); // Chama a ação para remover o projeto
      this.showConfirmation = false; // Fecha a modal de confirmação
    },
    editProject() {
      // Lógica para editar o projeto (agora usando a prop projectId)
      this.$router.push({ name: 'EditProject', params: { id: this.project.id } });
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 300px;
  height: 430px;
  border-radius: 16px;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-image {
  width: 100%;
  height: 215px;
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0 0;
  position: relative;
}

.card-actions {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  z-index: 10;
}

.favorite-btn {
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  color: white;
}

.actions-btn {
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.favorite-btn:hover,
.actions-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.actions-menu {
  position: absolute;
  top: 40px; /* Ajuste a posição conforme necessário */
  right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 100;
}

.actions-menu button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
}

.card-content {
  padding: 15px;
  text-align: left;
}

.card-title {
  margin-bottom: 20px;
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  text-align: left;
  color: #1F1283;
}

.card-client {
  margin-bottom: 20px;
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  color: #717171;
}

.card-divider {
  margin-bottom: 20px;
  color: #717171;
}

.card-dates {
  color: #717171;
}

.start-date i,
.end-date i {
  margin-right: 10px;
  color: #717171;
}
</style>
