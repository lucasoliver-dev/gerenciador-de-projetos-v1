<template>
  <div class="master-container">
    <div class="page-container d-flex flex-column justify-content-center align-items-start">
      <div class="first-content d-flex flex-column justify-content-center align-items-start mt-4">
        <button @click="goBack" class="back-btn">← Voltar</button>
        <h3 class="page-title">Alterar Projeto</h3>
      </div>
    </div>
    <div class="content-container col-12">
      <div class="container-form d-flex justify-content-center col-12">
        <div class="form-wrapper d-flex justify-content-start col-12">
          <form @submit.prevent="submitForm" class="form-content col-12">
            <div class="form-group">
              <label class="custom-label" :class="{ 'error-label': errors.name }" for="name">
                Nome do Projeto
                <span class="mandatory-label" :class="{ 'error-label': errors.name }"> (Obrigatório)</span>
              </label>
              <input type="text" v-model="form.name" :class="['form-control', { 'error-input': errors.name }]"
                id="name" />
              <span v-if="errors.name" class="invalid-feedback">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label class="custom-label" :class="{ 'error-label': errors.client }" for="client">
                Cliente
                <span class="mandatory-label" :class="{ 'error-label': errors.client }"> (Obrigatório)</span>
              </label>
              <input type="text" v-model="form.client" :class="['form-control', { 'error-input': errors.client }]"
                id="client" />
              <span v-if="errors.client" class="invalid-feedback">{{ errors.client }}</span>
            </div>

            <div class="form-group row col-12">
              <div class="col-sm-6">
                <label class="custom-label" :class="{ 'error-label': errors.startDate }" for="startDate">
                  Data de Início
                  <span class="mandatory-label" :class="{ 'error-label': errors.startDate }"> (Obrigatório)</span>
                </label>
                <input type="date" v-model="form.startDate"
                  :class="['form-control', { 'error-input': errors.startDate }]" id="startDate" />
                <span v-if="errors.startDate" class="invalid-feedback">{{ errors.startDate }}</span>
              </div>

              <div class="col-sm-6">
                <label class="custom-label" :class="{ 'error-label': errors.endDate }" for="endDate">
                  Data Final
                  <span class="mandatory-label" :class="{ 'error-label': errors.endDate }"> (Obrigatório)</span>
                </label>
                <input type="date" v-model="form.endDate" :class="['form-control', { 'error-input': errors.endDate }]"
                  id="endDate" />
                <span v-if="errors.endDate" class="invalid-feedback">{{ errors.endDate }}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="custom-label" for="image">Capa do Projeto</label>
              <div class="upload-wrapper">
                <div class="upload-icon">
                  <i class="bi bi-upload" style="font-size: 24px;"></i>
                </div>
                <div class="upload-message">Escolha uma imagem .jpg ou .png no seu dispositivo</div>
                <div class="upload-button">
                  <button type="button" class="custom-upload-btn" @click="triggerFileInput">
                    Selecionar Imagem
                  </button>
                </div>
                <img v-if="imagePreview" :src="imagePreview" alt="Preview da imagem" class="image-preview" />
              </div>
              <input type="file" id="image" @change="handleFileChange" class="d-none" />
              <span v-if="errors.image" class="invalid-feedback">{{ errors.image }}</span>
            </div>

            <button type="submit" class="submit-btn btn-primary">Salvar Alteração</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      form: {
        name: '',
        client: '',
        startDate: '',
        endDate: '',
        image: null,
        imageUrl: '',
      },
      errors: {},
      imagePreview: null,
    };
  },
  mounted() {
    this.loadProjectData();
  },
  methods: {
    loadProjectData() {
      const projectId = this.$route.params.id;
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      const project = projects.find(p => p.id === parseInt(projectId));

      if (project) {
        this.form = { ...project };
        this.imagePreview = project.imageUrl;
      }
    },

    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.form.image = selectedFile;

      if (selectedFile) {
        this.imagePreview = URL.createObjectURL(selectedFile);
      } else {
        this.imagePreview = null;
      }
    },

    async submitForm() {
      const schema = yup.object().shape({
        name: yup.string().required('Nome do Projeto é obrigatório'),
        client: yup.string().required('Cliente é obrigatório'),
        startDate: yup.date().required('Data de início é obrigatória'),
        endDate: yup
          .date()
          .required('Data final é obrigatória')
          .min(yup.ref('startDate'), 'A data final deve ser posterior à data de início'),
        image: yup
          .mixed()
          .notRequired()
          .test('fileSize', 'O arquivo é muito grande', value => !value || value.size <= 2000000)
          .test('fileType', 'Apenas arquivos de imagem são permitidos', value =>
            !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
          ),
      });

      try {
        await schema.validate(this.form, { abortEarly: false });

        // Atualiza o projeto no localStorage
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const projectIndex = projects.findIndex(p => p.id === this.form.id);

        if (projectIndex > -1) {
          projects[projectIndex] = { ...this.form, imageUrl: this.imagePreview };
          localStorage.setItem('projects', JSON.stringify(projects));
        }
        this.$router.push({ name: 'AddProjectList' });

      } catch (err) {
        if (err.inner) {
          this.errors = err.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {});
        } else {
          console.error('Erro inesperado:', err);
          this.errors = { general: 'Ocorreu um erro inesperado. Por favor, tente novamente.' };
        }
      }
    },

    goBack() {
      this.$router.push({ name: 'home' });
    },

    triggerFileInput() {
      document.getElementById('image').click();
    },
  },
});
</script>

<style scoped>
.master-container {
  height: 50%;
  width: 90%;
  background-color: #6c757d;
}

.custom-label {
  font-family: "Encode Sans Semi Expanded", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
  color: #695CCD;
  padding: 0.5rem;
  display: block;
}

.page-container {
  width: 100%;
  height: 10vh;
  background-color: #F4F2FF;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.first-content {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.content-container {
  background-color: #F4F2FF;
  width: 100%;
  height: 100%;
  margin-bottom: 0rem;
}

.back-btn {
  background: transparent;
  color: #1f1283;
  padding: 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.page-title {
  color: #1f1283;
  font-family: "Encode Sans Semi Expanded", sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.container-form {
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.form-control {
  border-radius: 5px;
  border: 1px solid #695CCD;
  width: 100%;
  height: 44px;
  padding: 0 1rem;
  transition: border-color 0.3s;
}

.form-control.error-input {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.8rem;
}

.custom-upload-btn {
  background-color: #695CCD;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-upload-btn:hover {
  background-color: #5b4cb1;
}

.image-preview {
  margin-top: 1rem;
  max-width: 100%;
  height: auto;
}

.submit-btn {
  background-color: #695CCD;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #5b4cb1;
}

.mandatory-label {
  color: red;
}

.error-label {
  color: red;
}

.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.upload-icon {
  margin-bottom: 0.5rem;
}
</style>
