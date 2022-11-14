<script setup>
import { computed } from "vue";
import { COLORS, EVENT__PAGE_SIZE_CHANGED } from "../commons";
import Card from "./Card.vue";

const { pageSize, numMovies, averageScore } = defineProps([
  "pageSize",
  "numMovies",
  "averageScore",
]);

const emitPageSizeChanged = defineEmits([EVENT__PAGE_SIZE_CHANGED]);
const pageSizeChanged = (event) =>
  emitPageSizeChanged(EVENT__PAGE_SIZE_CHANGED, event.target.value);
</script>

<template>
  <Card :classes="['pagination-header']">
    <h2 class="pagination-label">
      {{ `${numMovies} movie${numMovies > 1 ? "s" : ""}` }}
    </h2>
    <div class="column">
      <h2 class="avg-score">{{ averageScore.toFixed(0) }}</h2>
      <h3 class="avg-score-label">average-score</h3>
    </div>
    <div class="page-size-input">
      <label for="page-size-input">movies-per-page:</label>
      <input
        @change="pageSizeChanged"
        type="number"
        name="page-size-input"
        v-model="pageSize"
        min="1"
        :max="numMovies"
      />
      <select @change="pageSizeChanged" v-model="pageSize">
        <option v-for="ps in [5, 10, 20]">
          {{ ps }}
        </option>
      </select>
    </div>
  </Card>
</template>

<style scoped>
.pagination-header {
  width: min(65vw, 550px);
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  justify-content: space-evenly;
  align-items: baseline;
  text-align: center;
}

.column {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pagination-label,
.avg-score-label,
.avg-score {
  flex: 1;
  margin: 0;
}
.page-size-input {
  display: flex;
  flex: 3;
  justify-content: center;
  align-items: center;
}
.page-size-input > * {
  flex: 1;
  margin-inline: 10px;
  width: 48px;
  background: v-bind(COLORS.light);
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
</style>
