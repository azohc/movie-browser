<script setup>
import { EVENT__PAGE_SELECTED, COLORS } from "../commons";
import { ref } from "vue";
import PrevNextButton from "./PrevNextButton.vue";
import Button from "./Button.vue";

const { currentPage, lastPage, maxNextPrevSteps } = defineProps([
  "currentPage",
  "lastPage",
  "maxNextPrevSteps",
]);

const emitPageSelected = defineEmits([EVENT__PAGE_SELECTED]);

const pages = [...Array(lastPage).keys()].map((p) => p + 1);

const previousPages = ref(
  pages.filter((p) => p < currentPage + 1).slice(-maxNextPrevSteps)
);
const nextPages = ref(
  pages.filter((p) => p > currentPage + 1).slice(0, maxNextPrevSteps)
);

const selectPage = (page) => {
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
      :classes="['default-cursor']"
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
