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
    projectName: String, // Adicionando prop para receber o nome do projeto
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
  z-index: 1000; /* Garantindo que a modal esteja acima de outros elementos */
}

.modal-content {
  position: relative;
  background: white;
  width: 582px;
  height: 321px;
  border-radius: 8px; /* Todos os cantos arredondados */
  padding-top: 80px; /* Espaçamento para o círculo flutuante */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Sombra suave */
  text-align: center;
}

.floating-circle {
  position: absolute;
  width: 64px;
  height: 64px;
  background: #695ccd; /* Cor do círculo */
  border-radius: 50%; /* Círculo perfeito */
  top: -32px; /* Metade fora da modal */
  left: calc(50% - 32px); /* Centralizando horizontalmente */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9; /* Levemente visível */
}

.floating-circle i {
  color: white; /* Ícone de lixeira branco */
  font-size: 24px; /* Tamanho do ícone */
}

.modal-title {
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  margin: 0; /* Espaçamento em cima e embaixo */
  color: #1F1283; /* Cor do texto do título */
  padding: 0; /* Espaçamento interno */
  border-radius: 4px; /* Arredondando um pouco os cantos do título */
}

.modal-divider {
  border: 1px solid #8c8b93; /* Divider */
  width: 80%; /* Define a largura do divider */
  margin: 10px auto; /* Centraliza o divider e adiciona espaçamento em cima e embaixo */
}

.modal-question {
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin: 16px 0; /* Espaçamento em cima e embaixo */
}

.project-name {
  font-family: 'Encode Sans Semi Expanded', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin: 0; /* Espaçamento em cima e embaixo */
}

.modal-buttons {
  display: flex;
  justify-content: center; /* Centraliza os botões */
  gap: 20px; /* Espaçamento entre os botões */
  margin-top: 20px; /* Margem superior para os botões */
}

.btn {
  width: 226px;
  height: 52px;
  border-radius: 26px; /* Arredondando os cantos dos botões */
  background: #1F1283; /* Cor de fundo do botão */
  color: white; /* Cor do texto do botão */
  border: none; /* Sem borda padrão */
  cursor: pointer; /* Muda o cursor ao passar o mouse */
  font-weight: bold; /* Texto em negrito */
  transition: all 0.3s; /* Animação suave */
}

.btn:hover {
  background: transparent; /* Fundo transparente ao passar o mouse */
  border: 1px solid #1F1283; /* Borda ao passar o mouse */
}

.btn-confirm {
  color: white; /* Cor do texto do botão confirmar */
}

.btn-cancel {
  color: white; /* Cor do texto do botão cancelar */
}
</style>
