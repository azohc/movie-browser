<script setup>
import { ref } from "vue";
import { COLORS, EVENT__SEARCH_QUERY_CHANGED } from "../commons";
import Card from "./Card.vue";

const { searchQuery } = defineProps(["searchQuery"]);
const searchQueryRef = ref(searchQuery);

const emitSearchQueryChanged = defineEmits([EVENT__SEARCH_QUERY_CHANGED]);
const searchQueryChanged = () =>
  emitSearchQueryChanged(EVENT__SEARCH_QUERY_CHANGED, searchQueryRef.value);
</script>

<template>
  <Card class="filter-card">
    <label for="title-search">title-search:</label>
    <input
      @keyup="searchQueryChanged"
      type="text"
      name="title-search"
      id="title-search"
      v-model="searchQueryRef"
      placeholder="search for movies"
    />
  </Card>
</template>

<style scoped>
.filter-card {
  margin: 10px 0;
  width: min(55vw, 450px);
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  justify-content: center;
  align-items: baseline;
  text-align: center;
}
.filter-card > label {
  padding-inline: 20px;
}

.filter-card > input {
  width: inherit;
  flex: 1;
  background-color: v-bind(COLORS.light);
  border-color: v-bind(COLORS.dark);
  border-style: double;
  border-radius: 3px;
}
</style>
