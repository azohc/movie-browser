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
const selectPage = (page) => {
  emitPageSelected(EVENT__PAGE_SELECTED, page);
};
</script>

<template>
  <div class="pagi-container">
    <PrevNextButton
      :isPrev="true"
      :onClick="() => selectPage(currentPage - 1)"
      :isOn="currentPage > 0"
    />
    <div class="pages-container">
      <Button
        v-if="currentPage - nrPrevNextPages > 0"
        :onClick="() => selectPage(0)"
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
          Math.max(
            0,
            currentPage -
              nrPrevNextPages -
              (currentPage === lastPage - 1 ? 1 : 0)
          ),
          currentPage
        )"
        :onClick="() => selectPage(prevPage)"
        >{{ prevPage + 1 }}
      </Button>
      <Button :classes="['page-active']">{{ currentPage + 1 }}</Button>
      <Button
        v-for="nextPage in range(
          currentPage + 1,
          Math.min(
            lastPage,
            currentPage + nrPrevNextPages + 1 + (currentPage === 0 ? 1 : 0)
          )
        )"
        :onClick="() => selectPage(nextPage)"
        >{{ nextPage + 1 }}
      </Button>
      <Button
        v-if="currentPage + nrPrevNextPages + 1 < lastPage - 1"
        :classes="['default-cursor', 'no-border']"
        >...
      </Button>
      <Button
        v-if="currentPage + nrPrevNextPages + 1 < lastPage"
        :onClick="() => selectPage(lastPage - 1)"
      >
        {{ lastPage }}
      </Button>
    </div>
    <PrevNextButton
      :isPrev="false"
      :onClick="() => selectPage(currentPage + 1)"
      :isOn="currentPage + 1 < lastPage"
    />
  </div>
</template>

<style scoped>
.pagi-container {
  margin-inline: auto;
  display: flex;
  justify-content: center;
}

.pages-container {
  display: flex;
}

.page-active {
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
