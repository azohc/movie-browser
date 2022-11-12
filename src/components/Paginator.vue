<script setup>
import { EVENT__PAGE_SELECTED, COLORS } from "../commons";
import PrevNextButton from "./PrevNextButton.vue";
import Button from "./Button.vue";

const { currentPage, lastPage } = defineProps(["currentPage", "lastPage"]);

const emitPageSelected = defineEmits([EVENT__PAGE_SELECTED]);

const selectPage = (page) => {
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
    <!-- <Button
      v-if="currentPage - maxNextPrevSteps > 0"
      :onClick="() => selectPage(0)"
    >
      1
    </Button> -->
    <!-- <Button
      :classes="['default-cursor', 'no-border']"
      v-if="currentPage - maxNextPrevSteps > 1"
      >...
    </Button> -->
    <Button
      v-for="prevPage in currentPage"
      :onClick="() => selectPage(prevPage - 1)"
      >{{ prevPage }}
    </Button>
    <Button :classes="['page-active']">{{ currentPage + 1 }}</Button>
    <Button
      v-for="nextPage of lastPage - currentPage - 1"
      :onClick="() => selectPage(nextPage + currentPage)"
      >{{ nextPage + currentPage + 1 }}
    </Button>
    <!-- <Button
      :classes="['default-cursor', 'no-border']"
      v-if="currentPage + maxNextPrevSteps + 1 < lastPage - 1"
      >...
    </Button>
    <Button
      v-if="currentPage + maxNextPrevSteps + 1 < lastPage"
      :onClick="() => selectPage(lastPage - 1)"
      >{{ lastPage }}
    </Button> -->
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
