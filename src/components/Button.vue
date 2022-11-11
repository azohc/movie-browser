<script setup>
import { computed } from "vue";
import { COLORS } from "../commons";
const { onClick, classes } = defineProps(["onClick", "classes"]);
const classList = computed(() =>
  classes && classes.length ? classes.join(" ") : " "
);
</script>

<template>
  <span :class="`round-button ${classList}`" @click="onClick">
    <slot></slot>
  </span>
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
</style>
