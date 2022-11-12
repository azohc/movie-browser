<script setup>
/*
I have a new idea to download a huge database of movies and query it to find movies or to answer questions such as: what was the best action movie of the year 2015, or which year or years have the highest average score?

Can you help me build it?

Note: please do not update/change the file movies.json for this exercise!

level 1: Let's have a list showing the movies in the movies.json file. Show all relevant information such as title, genre, score, etc. However, I'm collecting a lot of movies, so please paginate the list to show X movies at a time only, and add an input field where I can set this value of X. Of course, the list should update to the correct length at all times.

level 2: Add first page, previous page, next page and last page buttons to the list. Make sure they are only active when relevant! Also, I would like to know the current page I'm looking at, and the total number of pages available.

level 3: Add an input search field for the title of the movie. The list should update to show only movies with titles that match my search query. Please don't make it too restrictive, I would like for example that if I type 'wars', all 'Star Wars' movies should be matched.

level 4: Add a multiselector for one or more years. The options should be all different years for which I have collected movies. Of course, the list should update to show only movies released in any of the chosen years.

level 5: Add a multiselector for one or more genres. The options should be all different genres existing in the list of movies. Since I collected the movies from different sources, some genres are duplicated and don't really match, I expect you to fix this issue to show consistent options. Of course, the list should update to show only movies of any of the chosen genres.

level 5: I'd like to know at all times what is the average score of ALL the movies that are listed (not considering the pagination), so please show it at the top of the list.

bonus level: Apply nice styling to this UI!
*/

import { COLORS } from "./commons";
import Paginator from "./components/Paginator.vue";
import { ref, computed } from "vue";
import movies from "./assets/movies.json";
import Card from "./components/Card.vue";

const pageSize = ref(5);
const currentPage = ref(0);
const lastPage = computed(() => Math.ceil(movies.length / pageSize.value));

const handlePageSizeChange = () => {
  if (currentPage.value + 1 > lastPage.value) {
    currentPage.value = lastPage.value - 1;
  }
};
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};
</script>

<template>
  <h1 class="title">movie-browser</h1>
  <Card class="movies-header">
    <h3 class="pagination-label">
      displaying {{ pageSize }} of the {{ movies.length }} movies found
    </h3>
    <div class="page-size-input">
      <label for="page-size-input">results per page:</label>
      <input
        @change="handlePageSizeChange"
        type="number"
        name="page-size-input"
        v-model="pageSize"
        min="1"
        :max="movies.length"
      />
      <select @change="handlePageSizeChange" v-model="pageSize">
        <option v-for="ps in [5, 10, 20]">
          {{ ps }}
        </option>
      </select>
    </div>
  </Card>
  <ul class="movies-container">
    <li
      class="movie-card-container"
      v-for="movie in movies.slice(
        currentPage * pageSize,
        currentPage * pageSize + pageSize
      )"
    >
      <Card :hasShadow="true">
        <h2 class="movie-title">
          {{ movie.title }}
        </h2>
        <div class="movie-subtitle">
          <h3 class="movie-subtitle-year">{{ movie.year }}</h3>
          <h3 class="movie-subtitle-genre">{{ movie.genre }}</h3>
          <h3>{{ movie.score }}⭐</h3>
        </div>
        <div class="img-container">
          <img
            v-if="movie.picture"
            :src="movie.picture"
            :alt="`Picture of ${movie.title}`"
          />
          <img
            v-else
            src="./assets/img_not_available.png"
            :alt="`Picture of ${movie.title}`"
          />
        </div>
      </Card>
    </li>
  </ul>
  <Paginator
    :currentPage="currentPage"
    :lastPage="lastPage"
    :nrPrevNextPages="2"
    @pageSelected="handlePageChange"
  />
</template>

<style scoped>
* {
  background: v-bind(COLORS.light);
  color: v-bind(COLORS.dark);
}

.title {
  font-size: 4em;
  display: flex;
  margin-inline: auto;
  text-align: center;
  justify-content: center;
}
.movies-header {
  width: 50vw;
  display: flex;
  margin-inline: auto;
  justify-content: space-evenly;
  align-items: baseline;
  text-align: center;
}

.movies-header > * {
  flex: 1;
}

.page-size-input {
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-size-input > * {
  flex: 1;
  margin-inline: 10px;
  width: 48px;
}

.page-size-input > label {
  flex: 3;
}
.page-size-input > input {
  margin-inline: 0;
  border-color: v-bind(COLORS.dark);
  border-style: double;
  border-radius: 3px;
}

.page-size-input > select {
  padding: 1px;
  border-color: v-bind(COLORS.dark);
  border-width: 2px;
  border-radius: 3px;
  border-style: double;
}

.movies-container {
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  list-style: none;
  align-items: center;
  justify-content: space-evenly;
}
.movie-card-container {
  margin: 20px;
}

.movie-title {
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
  max-width: 400px;
  margin-inline: auto;
}

.img-container > img {
  width: 100%;
}
</style>
