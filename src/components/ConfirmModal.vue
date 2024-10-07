<template>
    <div class="modal-overlay" v-if="show">
      <div class="modal-content">
        <h3>Tem certeza que deseja remover este projeto?</h3>
        <button @click="confirmRemoval">Confirmar</button>
        <button @click="cancelRemoval">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['show'],
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
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  button {
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  