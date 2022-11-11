<script setup>
const { n, m } = defineProps(["n", "m"]);
</script>

<template>
  <h3>I'm a child component that can count to {{ n - 1 }}:</h3>
  <span> {{ [...Array(n).keys()].join(" ") }}</span>
  <p>n = {{ n }} and m = {{ m }}</p>
</template>

<style scoped></style>
