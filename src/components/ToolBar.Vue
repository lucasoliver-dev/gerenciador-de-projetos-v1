<template>
    <div class="tool-bar">
      <input type="text" v-model="searchTerm" @input="searchProjects" placeholder="Buscar projetos..." />
      <button @click="clearSearch">Limpar</button>
      
      <div v-if="searchHistory.length" class="search-history">
        <h4>Histórico de buscas:</h4>
        <ul>
          <li v-for="(term, index) in searchHistory" :key="index">
            <button @click="selectSearchTerm(term)">{{ term }}</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: '',
        searchHistory: [],
      };
    },
    created() {
      // Carregar o histórico do localStorage
      const storedHistory = localStorage.getItem('searchHistory');
      if (storedHistory) {
        this.searchHistory = JSON.parse(storedHistory);
      }
    },
    methods: {
      searchProjects() {
        // Se o termo de busca não estiver vazio, adiciona ao histórico
        if (this.searchTerm.trim()) {
          this.addToSearchHistory(this.searchTerm);
          // Disparar evento de busca para outros componentes escutarem
          this.$emit('search', this.searchTerm);
        }
      },
      addToSearchHistory(term) {
        // Remover duplicatas
        const existingIndex = this.searchHistory.indexOf(term);
        if (existingIndex !== -1) {
          this.searchHistory.splice(existingIndex, 1);
        }
        
        // Adicionar ao início do array
        this.searchHistory.unshift(term);
  
        // Limitar a 5 termos
        if (this.searchHistory.length > 5) {
          this.searchHistory.pop();
        }
  
        // Atualizar localStorage
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      },
      selectSearchTerm(term) {
        this.searchTerm = term;
        this.searchProjects();
      },
      clearSearch() {
        this.searchTerm = '';
        this.$emit('search', '');
      },
    },
  };
  </script>
  
  <style scoped>
  .tool-bar {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  input {
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .search-history {
    margin-top: 10px;
  }
  .search-history h4 {
    margin-bottom: 5px;
  }
  .search-history ul {
    list-style-type: none;
    padding: 0;
  }
  .search-history li {
    margin-bottom: 5px;
  }
  button {
    background-color: #695ccd;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  </style>
  