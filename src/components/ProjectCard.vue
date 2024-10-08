<template>
  <div class="card project-card">
    <div class="card-image"
      :style="{ backgroundImage: project?.imageUrl ? `url(${project.imageUrl})` : `url('/defalt.png')` }">
      <div class="card-actions">
        <button class="favorite-btn" @click="toggleFavorite">
          {{ isFavorite ? '⭐' : '☆' }}
        </button>
        <button class="actions-btn">⋯</button>
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
  computed: {
    formattedDates() {
      return `${this.project?.startDate || ''} - ${this.project?.endDate || ''}`;
    }
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
