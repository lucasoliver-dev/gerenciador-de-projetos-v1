<template>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div>
          <label>Nome do Projeto:</label>
          <input type="text" v-model="form.name" />
        </div>
        <div>
          <label>Cliente:</label>
          <input type="text" v-model="form.client" />
        </div>
        <div>
          <label>Data de Início:</label>
          <input type="date" v-model="form.startDate" />
        </div>
        <div>
          <label>Data Final:</label>
          <input type="date" v-model="form.endDate" />
        </div>
        <div>
          <label>Capa do Projeto:</label>
          <input type="file" @change="handleFileChange" />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </template>
  
  <script>
  import * as yup from 'yup';
  
  export default {
    data() {
      return {
        form: {
          id: null,
          name: '',
          client: '',
          startDate: '',
          endDate: '',
          image: null,
        },
        errors: {},
      };
    },
    created() {
      const projectId = this.$route.params.id;
      const project = this.$store.getters.getProjects.find(p => p.id == projectId);
  
      if (project) {
        this.form = { ...project };
      }
    },
    methods: {
      handleFileChange(event) {
        this.form.image = event.target.files[0];
      },
      async submitForm() {
        const schema = yup.object().shape({
          name: yup.string().required('Nome do Projeto é obrigatório'),
          client: yup.string().required('Cliente é obrigatório'),
          startDate: yup.date().required('Data de início é obrigatória'),
          endDate: yup.date().required('Data final é obrigatória'),
        });
  
        try {
          await schema.validate(this.form, { abortEarly: false });
          this.$store.dispatch('updateProject', this.form);
          this.$router.push({ name: 'ProjectList' });
        } catch (err) {
          this.errors = err.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {});
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    margin: 0 auto;
    max-width: 400px;
    padding: 20px;
  }
  button {
    margin-top: 20px;
    background-color: #695ccd;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  </style>
  