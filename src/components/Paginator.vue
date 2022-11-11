<script setup>
import { EVENT__PAGE_SELECTED, COLORS } from "../commons";
import { computed, ref } from "vue";
import PrevNextButton from "./PrevNextButton.vue";
import Button from "./Button.vue";

const { currentPage, lastPage, maxNextPrevSteps } = defineProps([
  "currentPage",
  "lastPage",
  "maxNextPrevSteps",
]);

const emitPageSelected = defineEmits([EVENT__PAGE_SELECTED]);

const previousPages = computed(() =>
  [...Array(lastPage).keys()]
    .map((p) => p + 1)
    .filter((p) => p < currentPage + 1)
    .slice(-maxNextPrevSteps)
);
const nextPages = computed(() =>
  [...Array(lastPage).keys()]
    .map((p) => p + 1)
    .filter((p) => p > currentPage + 1)
    .slice(0, maxNextPrevSteps)
);

console.log("render pagi with lastpage=", lastPage);
const selectPage = (page) => {
  const pages = [...Array(lastPage).keys()].map((p) => p + 1);
  previousPages.value = pages
    .filter((p) => p < page + 1)
    .slice(-maxNextPrevSteps);
  nextPages.value = pages
    .filter((p) => p > page + 1)
    .slice(0, maxNextPrevSteps);
  emitPageSelected(EVENT__PAGE_SELECTED, page);
};
</script>

<template>
  <div class="debug">
    last page is {{ lastPage }}
    <br />
    pages array is {{ [...Array(lastPage).keys()].map((p) => p + 1) }}
  </div>
  <div class="page-scroller">
    <PrevNextButton
      :isPrev="true"
      :onClick="() => selectPage(currentPage - 1)"
      :isOn="currentPage > 0"
    />
    <Button
      v-if="currentPage - maxNextPrevSteps > 0"
      :onClick="() => selectPage(0)"
    >
      1
    </Button>
    <Button
      :classes="['default-cursor', 'no-border']"
      v-if="currentPage - maxNextPrevSteps > 1"
      >...
    </Button>
    <Button
      v-for="prevPage in previousPages"
      :onClick="() => selectPage(prevPage - 1)"
      >{{ prevPage }}
    </Button>
    <Button :classes="['page-active']">{{ currentPage + 1 }}</Button>
    <Button
      v-for="nextPage of nextPages"
      :onClick="() => selectPage(nextPage - 1)"
      >{{ nextPage }}
    </Button>
    <Button
      :classes="['default-cursor', 'no-border']"
      v-if="currentPage + maxNextPrevSteps + 1 < lastPage - 1"
      >...
    </Button>
    <Button
      v-if="currentPage + maxNextPrevSteps + 1 < lastPage"
      :onClick="() => selectPage(lastPage - 1)"
      >{{ lastPage }}
    </Button>
    <PrevNextButton
      :isPrev="false"
      :onClick="() => selectPage(currentPage + 1)"
      :isOn="currentPage + 1 < lastPage"
    />
  </div>
</template>

<style scoped>
.page-active {
  background-color: v-bind(COLORS.dark);
  color: v-bind(COLORS.light);
}

.default-cursor {
  cursor: default;
}

.no-border {
  border: none;
}
</style>
