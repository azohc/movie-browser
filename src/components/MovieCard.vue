<script setup>
import Card from "./Card.vue";
const { movie } = defineProps({
  movie: { required: true },
});
</script>

<template>
  <Card :hasShadow="true">
    <h2 class="movie-title">
      {{ movie.title }}
    </h2>
    <div class="movie-subtitle">
      <h3 class="movie-subtitle-year">{{ movie.year }}</h3>
      <h3 class="movie-subtitle-genre">{{ movie.genre }}</h3>
      <h3>{{ movie.score }}⭐</h3>
    </div>
    <div
      class="img-container"
      :style="{ maxWidth: `${movie.picture ? 400 : 300}px` }"
    >
      <img
        v-if="movie.picture"
        :src="movie.picture"
        :alt="`Picture of ${movie.title}`"
      />
      <img
        v-else
        src="../assets/img_not_available.png"
        :alt="`Picture of ${movie.title}`"
      />
    </div>
  </Card>
</template>

<style scoped>
.movie-title {
  text-transform: lowercase;
  font-size: 2em;
  text-align: center;
  margin-bottom: 10px;
}
.movie-subtitle {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
}

.movie-subtitle-genre {
  padding-inline: 20px;
}

.img-container {
  display: flex;
  margin-inline: auto;
}

.img-container > img {
  width: 100%;
}
</style>
