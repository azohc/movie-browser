<script setup>
import PrevNextButton from './PrevNextButton.vue';

const { currentPage, lastPage } = defineProps(['currentPage', 'lastPage']);

const emitPageSelected = defineEmits('pageSelected');
</script>

<template>
  <div class="page-scroller">
    <PrevNextButton
      :isPrev="true"
      :onClick="() => emitPageSelected('pageSelected', --currentPage)"
      :isOn="currentPage > 0"
    />
    <span
      class="round-button"
      v-for="prevPageNr in currentPage"
      @click="currentPage = prevPageNr - 1"
      >{{ prevPageNr }}</span
    >
    <span class="round-button page-active">{{ currentPage + 1 }}</span>
    <span
      class="round-button"
      v-for="nextPageNr in lastPage - currentPage - 1"
      @click="currentPage = nextPageNr + currentPage"
      >{{ nextPageNr + currentPage + 1 }}</span
    >
    <PrevNextButton
      :isPrev="false"
      :onClick="() => currentPage++"
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
