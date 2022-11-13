<script setup>
import { watch, ref } from "vue";
import Card from "./Card.vue";

const { title, options, event } = defineProps(["title", "options", "event"]);

const emit = defineEmits([event]);

const selected = ref([]);
watch(selected, () => emit(event, selected.value));
</script>

<template>
  <Card>
    <label :for="title"> {{ title }}: </label>
    <select
      @change="selectionChanged"
      class="styled-scrollbars"
      :name="title"
      multiple
      v-model="selected"
    >
      <option v-for="opt in options">{{ opt }}</option>
    </select>
  </Card>
</template>

<style scoped>
/* todo */
</style>
