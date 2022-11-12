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
import MovieCard from "./components/MovieCard.vue";
import FilterPaginatorCard from "./components/PaginationCard.vue";
import Card from "./components/Card.vue";

const pageSize = ref(5);
const currentPage = ref(0);
const lastPage = computed(() => Math.ceil(movies.length / pageSize.value));

const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize;
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
  <FilterPaginatorCard
    :pageSize="pageSize"
    :numMovies="movies.length"
    @pageSizeChanged="handlePageSizeChange"
  />
  <Paginator
    :currentPage="currentPage"
    :lastPage="lastPage"
    :nrPrevNextPages="2"
    @pageSelected="handlePageChange"
  />
  <ul class="movies-container">
    <li
      class="movie-card-container"
      v-for="movie in movies.slice(
        currentPage * pageSize,
        currentPage * pageSize + pageSize
      )"
    >
      <MovieCard :movie="movie" />
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

.movies-container {
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-inline: auto;
  list-style: none;
  align-items: center;
  justify-content: space-evenly;
}
.movie-card-container {
  margin: 20px;
}
</style>
