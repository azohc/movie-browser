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

const pageSize = ref(5);
const currentPage = ref(0);
const lastPage = computed(() => Math.ceil(movies.length / pageSize.value));

const handlePageSizeChange = () => {
  if (currentPage.value + 1 > lastPage.value) {
    currentPage.value = lastPage.value - 1;
  }
};
const handlePaginationChange = (selectedPage) => {
  currentPage.value = selectedPage;
};
</script>

<template>
  <div class="header">
    <h3>{{ movies.length }} movies</h3>
    <div class="page-size-input">
      <label for="page-size-input">Results per page:</label>
      <input
        type="number"
        name="page-size-input"
        v-model="pageSize"
        min="1"
        :max="movies.length"
      />
      <select v-model="pageSize">
        <option v-for="ps in [5, 10, 20]">{{ ps }}</option>
      </select>
    </div>
  </div>
  <div class="movie-container">
    <ul>
      <li
        v-for="movie in movies.slice(
          currentPage * pageSize,
          currentPage * pageSize + pageSize
        )"
      >
        {{ movie.title }}
      </li>
    </ul>
  </div>
  <Paginator
    :currentPage="currentPage"
    :lastPage="lastPage"
    :nrPrevNextPages="2"
    @pageSelected="handlePaginationChange"
  />
</template>

<style scoped>
* {
  background: v-bind(COLORS.light);
  color: v-bind(COLORS.dark);
}

.header {
  display: flex;
  margin-inline: auto;
  justify-content: space-evenly;
  align-items: baseline;
}

.page-size-input > * {
  margin-inline: 10px;
}
.page-size-input > input {
  margin-inline: 0;
  border-radius: 3px;
}

.page-size-input > select {
  padding: 1px;
  border-radius: 3px;
}
</style>
