<script setup>
/*
I have a new idea to download a huge database of movies and query it to find movies or to answer questions such as: what was the best action movie of the year 2015, or which year or years have the highest average score?

Can you help me build it?

Note: please do not update/change the file movies.json for this exercise!


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
import FilterCard from "./components/FilterCard.vue";

const pageSize = ref(5);
const currentPage = ref(0);
const titleSearchQuery = ref("");
const lastPage = computed(() =>
  Math.ceil(filteredMovies.value.length / pageSize.value)
);
const filteredMovies = computed(() =>
  movies.filter((m) =>
    titleSearchQuery !== ""
      ? m.title
          .toLowerCase()
          .includes(titleSearchQuery.value.trim().toLowerCase())
      : true
  )
);
const handleSearchTextChange = (newSearchQuery) => {
  titleSearchQuery.value = newSearchQuery;
  if (currentPage.value + 1 > lastPage.value) {
    currentPage.value = Math.max(lastPage.value - 1, 0);
  }
};

const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize;
  if (currentPage.value + 1 > lastPage.value) {
    currentPage.value = Math.max(lastPage.value - 1, 0);
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
    :numMovies="filteredMovies.length"
    @onPageSizeChanged="handlePageSizeChange"
  />
  <FilterCard
    :searchQuery="titleSearchQuery"
    @searchQueryChanged="handleSearchTextChange"
  />
  <ul v-if="filteredMovies.length" class="movies-container">
    <li
      class="movie-card-container"
      v-for="movie in filteredMovies.slice(
        currentPage * pageSize,
        currentPage * pageSize + pageSize
      )"
    >
      <MovieCard :movie="movie" />
    </li>
  </ul>
  <div class="zero-movies" v-else>
    <h3>no movies found =[</h3>
    <p>you can try changing your search and/or filter though =]</p>
  </div>
  <Paginator
    :currentPage="currentPage"
    :lastPage="lastPage"
    :nrPrevNextPages="2"
    @onPageSelected="handlePageChange"
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

.zero-movies {
  text-align: center;
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
