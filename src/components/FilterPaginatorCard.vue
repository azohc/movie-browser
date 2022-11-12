<script setup>
import { COLORS, EVENT__PAGE_SIZE_CHANGED } from "../commons";
import Card from "./Card.vue";

const { pageSize, onPageSizeChange, numMovies } = defineProps([
  "pageSize",
  "onPageSizeChange",
  "numMovies",
]);

const emitPageSizeChanged = defineEmits([EVENT__PAGE_SIZE_CHANGED]);
const pageSizeChanged = (event) =>
  emitPageSizeChanged(EVENT__PAGE_SIZE_CHANGED, event.target.value);
</script>

<template>
  <Card :classes="['pagination-header']">
    <h3 class="pagination-label">
      displaying {{ pageSize }} of the {{ numMovies }} movies found
    </h3>
    <div class="page-size-input">
      <label for="page-size-input">results per page:</label>
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
  width: 50vw;
  display: flex;
  margin-inline: auto;
  justify-content: space-evenly;
  align-items: baseline;
  text-align: center;
}

.pagination-header > * {
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
