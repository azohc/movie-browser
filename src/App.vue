<script setup>
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
    <h3>zero movies found =[</h3>
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
  padding: 0;
  margin-inline: auto;
  list-style: none;
  align-items: center;
  justify-content: space-evenly;
}
.movie-card-container {
  margin: 20px;
}
</style>
