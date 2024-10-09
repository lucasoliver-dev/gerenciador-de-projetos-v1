<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <div class="floating-circle">
        <i class="bi bi-trash" aria-hidden="true"></i>
      </div>
      <h3 class="modal-title">Remover Projeto</h3>
      <hr class="modal-divider" />
      <p class="modal-question">Essa ação removerá definitivamente o projeto:</p>
      <p class="project-name">{{ projectName }}</p>
      <div class="modal-buttons">
        <button class="btn btn-cancel" @click="cancelRemoval">Cancelar</button>
        <button class="btn btn-confirm" @click="confirmRemoval">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    projectName: String, 
  },
  methods: {
    confirmRemoval() {
      this.$emit('confirm');
    },
    cancelRemoval() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  width: 582px;
  height: 321px;
  border-radius: 8px;
  padding-top: 80px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.floating-circle {
  position: absolute;
  width: 64px;
  height: 64px;
  background: #695ccd;
  border-radius: 50%;
  top: -32px;
  left: calc(50% - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
}

.floating-circle i {
  color: white;
  font-size: 24px;
}

.modal-title {
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  margin: 0;
  color: #1F1283;
  padding: 0;
  border-radius: 4px;
}

.modal-divider {
  border: 1px solid #8c8b93;
  width: 80%;
  margin: 10px auto;
}

.modal-question {
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin: 16px 0;
}

.project-name {
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin: 0;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.btn {
  width: 226px;
  height: 52px;
  border-radius: 26px;
  background: #1F1283;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.btn:hover {
  background: transparent;
  border: 1px solid #1F1283;
}

.btn-confirm {
  color: white;
}

.btn-cancel {
  color: white;
}
</style>
