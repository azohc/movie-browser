<script setup>
import { computed, ref } from "vue";
import CountTo from "./Test.vue";

const n = ref(5);
const m = computed(() => n.value * 2);
</script>

<template>
  <div>
    <h1>parent component</h1>
    <CountTo :n="n" :m="m"></CountTo>
  </div>
  <select v-model="n">
    <option v-for="opt in [5, 10, 15]" :value="opt">
      {{ opt }}
    </option>
  </select>
</template>

<style scoped></style>
