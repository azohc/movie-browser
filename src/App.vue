<script setup>
import {
  COLORS,
  EVENT__GENRE_SELECTION_CHANGED,
  EVENT__YEAR_SELECTION_CHANGED,
  standardizeGenre,
} from "./commons";
import Paginator from "./components/Paginator.vue";
import { watch, ref, computed } from "vue";
import MOVIES from "./assets/movies.json";
import MovieCard from "./components/MovieCard.vue";
import PaginatorCard from "./components/PaginationCard.vue";
import FilterCard from "./components/FilterCard.vue";
import Card from "./components/Card.vue";
import PrevNextButton from "./components/PrevNextButton.vue";
import OptionFilterCard from "./components/OptionFilterCard.vue";

const movies = MOVIES.map((m) => {
  return Object.assign({}, m, {
    score: Number(m.score),
    year: Number(m.year),
  });
});

// Reactive vars
const pageSize = ref(5);
const currentPage = ref(0);
const titleSearchQuery = ref("");
const selectedYears = ref([]);
const selectedGenres = ref([]);
const lastPage = computed(() =>
  Math.ceil(filteredMovies.value.length / pageSize.value)
);
const yearOptions = computed(() => {
  let s = new Set(movies.map((m) => m.year));
  let it = s.values();
  return Array.from(it).sort();
});
const genreOptions = computed(() => {
  return Array.from(
    new Set(movies.map((m) => standardizeGenre(m.genre))).values()
  ).sort();
});
const filteredMovies = computed(() =>
  movies
    .filter((m) => filterByTitle(m))
    .filter((m) => filterByYear(m))
    .filter((m) => filterByGenre(m))
);
const slicedMovies = computed(() =>
  filteredMovies.value.slice(
    currentPage.value * pageSize.value,
    (currentPage.value + 1) * pageSize.value
  )
);
const averageScore = computed(() => {
  const sum = filteredMovies.value
    .map((m) => m.score)
    .reduce((a, b) => a + b, 0);
  return sum / filteredMovies.value.length || 0;
});

// Filters
const filterByTitle = (movie) => {
  if (titleSearchQuery.value.length < 2) return true;
  return movie.title
    .toLowerCase()
    .includes(titleSearchQuery.value.toLowerCase());
};
const filterByYear = (movie) =>
  selectedYears.value.length === 0 || selectedYears.value.includes(movie.year);

const filterByGenre = (movie) =>
  selectedGenres.value.length === 0 ||
  selectedGenres.value.includes(standardizeGenre(movie.genre));

// Watchers
watch([pageSize, titleSearchQuery, selectedYears, selectedGenres], () => {
  if (currentPage.value + 1 > lastPage.value) {
    currentPage.value = Math.max(lastPage.value - 1, 0);
  }
});

// Handlers
const handleSearchTextChange = (newSearchQuery) => {
  titleSearchQuery.value = newSearchQuery;
};
const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize;
};
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};
const handleYearSelectionChange = (newSelection) => {
  selectedYears.value = newSelection.map((year) => Number(year));
};
const handleGenreSelectionChange = (newSelection) => {
  selectedGenres.value = newSelection;
};
</script>

<template>
  <h1 class="title">movie-browser</h1>
  <PaginatorCard
    :pageSize="pageSize"
    :averageScore="averageScore"
    :numMovies="filteredMovies.length"
    @pageSizeChanged="handlePageSizeChange"
  />
  <Card class="select-filter-container">
    <OptionFilterCard
      style="padding-right: 20px; flex: 1"
      class="year-filter"
      :title="'filter-by-year'"
      :options="yearOptions"
      :event="EVENT__YEAR_SELECTION_CHANGED"
      @yearSelectionChanged="handleYearSelectionChange"
    ></OptionFilterCard>

    <OptionFilterCard
      style="flex: 2"
      class="genre-filter"
      :title="'filter-by-genre'"
      :options="genreOptions"
      :event="EVENT__GENRE_SELECTION_CHANGED"
      @genreSelectionChanged="handleGenreSelectionChange"
    ></OptionFilterCard>
  </Card>

  <FilterCard
    :searchQuery="titleSearchQuery"
    @searchQueryChanged="handleSearchTextChange"
  />

  <div class="movies-container">
    <PrevNextButton
      :isPrev="true"
      :onClick="() => (currentPage = currentPage - 1)"
      :isOn="currentPage > 0"
    />
    <ul v-if="filteredMovies.length" class="movie-cards">
      <li
        class="movie-card-container"
        v-for="movie of slicedMovies"
        :key="movie.id"
      >
        <MovieCard :movie="movie" />
      </li>
    </ul>
    <div class="zero-movies" v-else>
      <h3>zero movies found =[</h3>
      <p>you can try changing your search and/or filter though =]</p>
    </div>
    <PrevNextButton
      :isPrev="false"
      :onClick="() => (currentPage = currentPage + 1)"
      :isOn="currentPage + 1 < lastPage"
    />
  </div>
  <Paginator
    :currentPage="currentPage"
    :lastPage="lastPage"
    :nrPrevNextPages="2"
    @pageSelected="handlePageChange"
  />
</template>

<style>
* {
  background: v-bind(COLORS.light);
  color: v-bind(COLORS.dark);
}

input,
select {
  background-color: v-bind(COLORS.light);
  border-color: v-bind(COLORS.dark);
  border-style: double;
  border-radius: 3px;
}

select {
  border-width: 2px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.movie-cards {
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

.select-filter-container {
  margin: 10px 0;
  width: min(70vw, 600px);
  display: flex;
  margin-inline: auto;
  justify-content: space-evenly;
  align-items: baseline;
  text-align: center;
}

.genre-filter,
.year-filter {
  width: 30vw;
  display: flex;
  justify-content: center;
}

label {
  padding-right: 20px;
}

option:focus {
  background: v-bind(COLORS.darkGray);
  color: v-bind(COLORS.light);
}

option:checked {
  background: v-bind(COLORS.dark);
  color: v-bind(COLORS.light);
}
</style>
