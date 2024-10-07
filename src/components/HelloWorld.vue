<template>
  <div class="hello d-flex flex-column align-items-center justify-content-center">
    <div class="content-wrapper d-flex flex-column align-items-center justify-content-center">
      <div class="no-project">Nenhum Projeto</div>
      <div class="instruction">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</div>
      <button @click="goToNewProject" class="add-project-btn d-flex align-items-center justify-content-center">
        <svg class="btn-background" xmlns="http://www.w3.org/2000/svg" width="230" height="52" viewBox="0 0 230 52" fill="none">
          <path d="M0 26C0 11.6406 11.6406 0 26 0H204C218.359 0 230 11.6406 230 26C230 40.3594 218.359 52 204 52H26C11.6406 52 0 40.3594 0 26Z" fill="#695CCD"/>
        </svg>
        <i class="bi bi-plus-circle add-icon"></i> 
        <span class="btn-text">Novo Projeto</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    goToNewProject() {
      this.$router.push({ name: 'NewProject' });
    },
  },
});
</script>

<style scoped>
.hello {
  width: 100vw;
  height: 100vh;
  background-color: #F4F2FF;
  border-radius: 4px;
}
.content-wrapper {
  background-color: white; 
  border-radius: 8px;
  width: 95vw;
  height: 90vh;
}

.no-project {
  color: #1F1283;
  font-family: "Encode Sans Semi Expanded";
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.instruction {
  color: #717171;
  font-family: "Encode Sans Semi Expanded";
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 30px;
}
.btn-background {
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
}
.add-project-btn {
  display: flex; 
  align-items: center;
  justify-content: center;
  position: relative; 
  width: 230px;
  height: 52px;
  background: none;
  border: none;
  cursor: pointer;
}

.add-icon {
  font-size: 24px; 
  color: #ffffff; 
  position: absolute; 
  z-index: 2; 
  left: 10px; 
  top: 50%; 
  transform: translateY(-50%); 
  margin-left: 1em;
}

.btn-text {
  color: white;
  font-family: "Encode Sans Semi Expanded";
  font-size: 20px;
  font-weight: 400;
  font-style: normal;
  position: relative;
  z-index: 2; 
  margin-left: 2.5em; 
  line-height: 22px;
}
</style>
