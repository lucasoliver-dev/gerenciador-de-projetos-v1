<template>
  <div class="card">
    <div
      class="card-image"
      :style="{ backgroundImage: `url(${project?.imageUrl})` }"
    ></div>
    <div class="card-content">
      <div class="card-header">
        <span class="card-title">{{ project?.name }}</span>
        <div class="card-actions">
          <button class="favorite-btn" @click="toggleFavorite">{{ isFavorite ? '⭐' : '☆' }}</button>
          <button class="actions-btn">⋯</button>
        </div>
      </div>
      <div class="card-client">{{ project?.client }}</div>
      <div class="card-divider"></div>
      <div class="card-dates">
        <span class="calendar-icon">📅</span> {{ project?.date }}
      </div>
    </div>
  </div>
</template>

  
<script>
  export default {
    props: ['project'],
    data() {
      return {
        isFavorite: false,
      };
    },
    methods: {
      toggleFavorite() {
        this.isFavorite = !this.isFavorite;
        this.$emit('toggle-favorite', this.project.id, this.isFavorite);
      },
    },
  };
</script>
  
<style scoped>
  .card {
    width: 346px;
    height: 231px;
    border-radius: 16px;
    margin: 20px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
    height: 50%;
    background-size: cover;
    border-radius: 16px 16px 0 0;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .card-actions button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .card-client {
    margin: 10px 0;
    color: #717171;
  }
  
  .card-divider {
    width: 298px;
    height: 1px;
    background: #ECECEC;
    margin-bottom: 10px;
  }
  
  .card-dates {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  
  .calendar-icon {
    margin-right: 5px;
  }
</style>
  