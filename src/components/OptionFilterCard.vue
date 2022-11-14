<script setup>
import { watch, ref } from "vue";
import { EVENT__SELECTION_CHANGED } from "../commons";

const { title, options } = defineProps(["title", "options"]);

const emit = defineEmits([EVENT__SELECTION_CHANGED]);

const selected = ref([]);
watch(selected, () => emit(EVENT__SELECTION_CHANGED, selected.value));
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
