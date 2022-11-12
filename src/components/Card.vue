<script setup>
import { computed } from "vue";
import { COLORS } from "../commons";

const { hasShadow, classes } = defineProps({
  hasShadow: { type: Boolean, required: false, default: false },
  classes: { type: Array, required: false },
});
const classList = computed(() =>
  classes && classes.length ? classes.join(" ") : " "
);
</script>

<template>
  <div
    :class="`card ${classList}`"
    :style="{
      'box-shadow': hasShadow ? `${COLORS.darkGray} 7px 7px` : 'none',
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border: 3px v-bind(COLORS.darkGray) solid;
  min-height: 2vh;
  min-width: 2vw;
  border-radius: 10px;
  padding: 10px;
  transition: box-shadow 0.3s ease-out;
}
</style>
