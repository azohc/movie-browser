<script setup>
import { EVENT__PAGE_SELECTED, COLORS, range } from "../commons";
import PrevNextButton from "./PrevNextButton.vue";
import Button from "./Button.vue";

const { currentPage, lastPage, nrPrevNextPages } = defineProps([
  "currentPage",
  "lastPage",
  "nrPrevNextPages",
]);

const emitPageSelected = defineEmits([EVENT__PAGE_SELECTED]);
const pageSelected = (page) => emitPageSelected(EVENT__PAGE_SELECTED, page);
</script>

<template>
  <div class="pagi-container">
    <PrevNextButton
      :isPrev="true"
      :onClick="() => pageSelected(currentPage - 1)"
      :isOn="currentPage > 0"
    />
    <div class="pages-container">
      <template v-if="lastPage !== 0">
        <Button
          v-if="currentPage - nrPrevNextPages > 0"
          :onClick="() => pageSelected(0)"
        >
          1
        </Button>
        <Button
          v-if="currentPage - nrPrevNextPages > 1"
          :classes="['default-cursor', 'no-border']"
          >...
        </Button>
        <Button
          v-for="prevPage in range(
            Math.max(0, currentPage - nrPrevNextPages),
            currentPage
          )"
          :onClick="() => pageSelected(prevPage)"
          >{{ prevPage + 1 }}
        </Button>
      </template>
      <Button :classes="['page-active']">{{ currentPage + 1 }}</Button>
      <template v-if="lastPage !== 0">
        <Button
          v-for="nextPage in range(
            currentPage + 1,
            Math.min(lastPage, currentPage + nrPrevNextPages + 1)
          )"
          :onClick="() => pageSelected(nextPage)"
          >{{ nextPage + 1 }}
        </Button>
        <Button
          v-if="currentPage + nrPrevNextPages + 1 < lastPage - 1"
          :classes="['default-cursor', 'no-border']"
          >...
        </Button>
        <Button
          v-if="currentPage + nrPrevNextPages + 1 < lastPage"
          :onClick="() => pageSelected(lastPage - 1)"
        >
          {{ lastPage }}
        </Button>
      </template>
    </div>
    <PrevNextButton
      :isPrev="false"
      :onClick="() => pageSelected(currentPage + 1)"
      :isOn="currentPage + 1 < lastPage"
    />
  </div>
</template>

<style scoped>
.pagi-container {
  padding: 36px 0;
  margin-inline: auto;
  display: flex;
  justify-content: center;
}

.pages-container {
  display: flex;
}

.page-active {
  font-weight: 900;
  background-color: v-bind(COLORS.dark);
  color: v-bind(COLORS.light);
}

.default-cursor {
  cursor: default;
}

.no-border {
  border-color: transparent;
}
</style>
