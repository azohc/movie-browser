<script setup>
import { EVENT__PAGE_SELECTED, COLORS } from "../commons";
import { ref } from "vue";
import PrevNextButton from "./PrevNextButton.vue";

const { currentPage, lastPage, maxNextPrevSteps } = defineProps([
  "currentPage",
  "lastPage",
  "maxNextPrevSteps",
]);

const emitPageSelected = defineEmits([EVENT__PAGE_SELECTED]);

const pages = [...Array(lastPage).keys()].map((p) => p + 1);

const previousPages = ref(pages.filter((p) => p < currentPage + 1));
const nextPages = ref(pages.filter((p) => p > currentPage + 1));

console.log("INIT:", previousPages.value, currentPage, nextPages.value);

const selectPage = (page) => {
  console.log("nextPage is ", page);
  previousPages.value = pages.filter((p) => p < page + 1);
  nextPages.value = pages.filter((p) => p > page + 1);
  emitPageSelected(EVENT__PAGE_SELECTED, page);
  console.log(previousPages.value, currentPage, nextPages.value);
};
</script>

<template>
  <div class="page-scroller">
    <PrevNextButton
      :isPrev="true"
      :onClick="() => selectPage(currentPage - 1)"
      :isOn="currentPage > 0"
    />
    <span
      class="round-button"
      v-for="prevPage in previousPages"
      @click="() => selectPage(prevPage - 1)"
      >{{ prevPage }}</span
    >
    <span class="round-button page-active">{{ currentPage + 1 }}</span>
    <span
      class="round-button"
      v-for="nextPage of nextPages"
      @click="() => selectPage(nextPage - 1)"
      >{{ nextPage }}</span
    >
    <PrevNextButton
      :isPrev="false"
      :onClick="() => selectPage(currentPage + 1)"
      :isOn="currentPage + 1 < lastPage"
    />
  </div>
</template>

<style scoped>
.round-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 5px;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  border: 1px v-bind(COLORS.dark) solid;
}

.page-active {
  background-color: v-bind(COLORS.dark);
  color: v-bind(COLORS.light);
}
</style>
