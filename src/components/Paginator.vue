<script setup>
import { EVENT__PAGE_SELECTED } from "../commons";
import PrevNextButton from "./PrevNextButton.vue";

const { currentPage, lastPage } = defineProps(["currentPage", "lastPage"]);

const emitPageSelected = defineEmits([EVENT__PAGE_SELECTED]);

const handlePageSelect = (page) => {
  emitPageSelected(EVENT__PAGE_SELECTED, page);
};
</script>

<template>
  <div class="page-scroller">
    <PrevNextButton
      :isPrev="true"
      :onClick="() => handlePageSelect(currentPage - 1)"
      :isOn="currentPage > 0"
    />
    <span
      class="round-button"
      v-for="prevPageNr in currentPage"
      @click="() => handlePageSelect(prevPageNr - 1)"
      >{{ prevPageNr }}</span
    >
    <span class="round-button page-active">{{ currentPage + 1 }}</span>
    <span
      class="round-button"
      v-for="nextPageNr in lastPage - currentPage - 1"
      @click="() => handlePageSelect(nextPageNr + currentPage)"
      >{{ nextPageNr + currentPage + 1 }}</span
    >
    <PrevNextButton
      :isPrev="false"
      :onClick="() => handlePageSelect(currentPage + 1)"
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
  border: 1px black solid;
}

.page-active {
  background-color: black;
  color: white;
}
</style>
