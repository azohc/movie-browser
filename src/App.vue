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
import Sandbox from "./components/test/Sandbox.vue";
import { ref, computed } from "vue";
import movies from "./assets/movies.json";

const pageSize = ref(2);
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
  <span> showing {{ pageSize }} out of {{ movies.length }} movies</span>
  <div>
    <label for="page-size-input">Results per page:</label>
    <input type="number" name="page-size-input" v-model="pageSize" />
  </div>
  <div>
    <select @change="handlePageSizeChange" v-model="pageSize">
      <option v-for="ps in [5, 10]" :value="ps">
        {{ ps }}
      </option>
    </select>
  </div>
  <Paginator
    :currentPage="currentPage"
    :lastPage="lastPage"
    @pageSelected="handlePaginationChange"
  />
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

  <Sandbox></Sandbox>
</template>

<style scoped>
* {
  background: v-bind(COLORS.light);
  color: v-bind(COLORS.dark);
}
.page-scroller {
  display: flex;
}
</style>
