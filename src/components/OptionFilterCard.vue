<script setup>
import { watch, ref } from "vue";

const { title, options, event } = defineProps([
  "title",
  "options",
  "event",
]);

const emit = defineEmits([event]);

const selected = ref([]);
watch(selected, () => emit(event, selected.value));
</script>

<template>
  <div class="container">
    <label :for="title"> {{ title }}: </label>
    <select
      class="styled-scrollbars"
      :name="title"
      multiple
      v-model="selected"
    >
      <option v-for="opt in options">{{ opt }}</option>
    </select>
  </div>
</template>

<style scoped>
.container > label {
  flex: 1;
}
.container > select {
  flex: 1;
}
</style>
