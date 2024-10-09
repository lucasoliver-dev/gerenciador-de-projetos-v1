<template>
  <div class="master-container">
    <div class="page-container d-flex flex-column justify-content-center align-items-start">
      <!-- Botão de voltar -->
      <div class="first-content d-flex flex-column justify-content-center align-items-start mt-4">
        <button @click="goBack" class="back-btn">
          ← Voltar
        </button>
        <h3 class="page-title">Novo Projeto</h3>
      </div>
    </div>
    <div class="content-container col-12">
      <div class="container-form d-flex justify-content-center col-12">
        <!-- Formulário dentro do container -->
        <div class="form-wrapper d-flex justify-content-start col-12">
          <form @submit.prevent="submitForm" class="form-content col-12">
            <!-- Nome do Projeto -->
            <div class="form-group">
              <label class="custom-label" :class="{ 'error-label': errors.name }" for="name">
                Nome do Projeto
                <span class="mandatory-label" :class="{ 'error-label': errors.name }"> (Obrigatório)</span>
              </label>
              <input type="text" v-model="form.name" :class="['form-control', { 'error-input': errors.name }]"
                id="name" />
              <span v-if="errors.name" class="invalid-feedback">{{ errors.name }}</span>
            </div>
            <!-- Cliente -->
            <div class="form-group">
              <label class="custom-label" :class="{ 'error-label': errors.name }" for="client">
                Cliente
                <span class="mandatory-label" :class="{ 'error-label': errors.name }"> (Obrigatório)</span>
              </label>
              <input type="text" v-model="form.client" :class="['form-control', { 'error-input': errors.client }]"
                id="client" />
              <span v-if="errors.client" class="invalid-feedback">{{ errors.client }}</span>
            </div>
            <!-- Data de Início e Data Final -->
            <div class="form-group row col-12">
              <div class="col-sm-6">
                <label class="custom-label" :class="{ 'error-label': errors.name }" for="startDate">
                  Data de Início
                  <span class="mandatory-label" :class="{ 'error-label': errors.name }"> (Obrigatório)</span>
                </label>
                <input type="date" v-model="form.startDate"
                  :class="['form-control', { 'error-input': errors.startDate }]" id="startDate" />
                <span v-if="errors.startDate" class="invalid-feedback">{{ errors.startDate }}</span>
              </div>

              <div class="col-sm-6">
                <label class="custom-label" :class="{ 'error-label': errors.name }" for="endDate">
                  Data Final
                  <span class="mandatory-label" :class="{ 'error-label': errors.name }"> (Obrigatório)</span>
                </label>
                <input type="date" v-model="form.endDate" :class="['form-control', { 'error-input': errors.endDate }]"
                  id="endDate" />
                <span v-if="errors.endDate" class="invalid-feedback">{{ errors.endDate }}</span>
              </div>
            </div>
            <!-- Capa do Projeto -->
            <div class="form-group">
              <label class="custom-label" for="image">
                Capa do Projeto
              </label>
              <div class="upload-wrapper">
                <div class="upload-icon">
                  <i class="bi bi-upload" style="font-size: 24px;"></i>
                </div>
                <div class="upload-message">
                  Escolha uma imagem .jpg ou .png no seu dispositivo
                </div>
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
            <button type="submit" class="submit-btn btn-primary">
              Salvar Projeto
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

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
  methods: {
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.form.image = selectedFile;

      if (selectedFile) {
        this.imagePreview = URL.createObjectURL(selectedFile);
      } else {
        this.imagePreview = null;
      }
    },

    async handleImageUpload(event) {
      const file = event.target.files[0];
      this.form.image = file;

      // Converte a imagem para base64
      if (file) {
        this.imagePreview = await this.convertImageToBase64(file);
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

        // Gera um ID único para o projeto
        const projectId = Date.now();



        this.$store.dispatch('addProject', {
          ...this.form,
          id: Date.now(),
          imageUrl: this.imagePreview,
        });

        localStorage.setItem(`projectImage_${projectId}`, this.imagePreview);


        this.$emit('projectCreated', { id: projectId, ...this.form, imageUrl: this.imagePreview });



        this.$router.push({ name: 'AddProjectList' });


        this.form = {
          name: '',
          client: '',
          startDate: '',
          endDate: '',
          image: null,
        };
        this.imagePreview = null;

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

    convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        if (file) {
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      });
    },

    goBack() {
      this.$router.push({ name: 'home' });
    },

    triggerFileInput() {
      document.getElementById('image').click();
    },
  }
});
</script>

<style scoped>
.master-container {
  height: 100vh;
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
  width: 100vw;
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
  width: 100vw;
  height: 120vh;
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
  background-color: #F4F2FF;
  border-radius: 8px;
  width: 95vw;
  height: 110vh;
  margin: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.form-wrapper {
  background-color: #F4F2FF;
  border-radius: 8px;
  max-width: 600px;
  height: 100%;
  padding: 2rem;
}

.form-content {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  align-items: start;
  border: #1f1283;
}

.mandatory-label {
  font-family: "Encode Sans Semi Expanded", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #717171;
}

.error-label {
  color: red;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-input {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-btn {
  background-color: #695ccd;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 26px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #5747a4;
}

.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
  border: 1px dotted #695CCD;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.image-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-icon {
  margin-top: 10px;
}

.upload-message {
  margin-top: 10px;
  font-size: 12px;
  color: #6c757d;
}

.upload-button {
  margin-top: 10px;
}

.custom-upload-btn {
  background-color: transparent;
  border: 1px solid #695CCD;
  color: #695CCD;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.custom-upload-btn:hover {
  background-color: #695CCD;
  color: white;
}
</style>
