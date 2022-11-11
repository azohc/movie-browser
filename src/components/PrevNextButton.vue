<script setup>
const { isPrev, onClick, showSvg } = defineProps(['isPrev', 'onClick', 'isOn']);
</script>

<template>
  <div
    class="round-button-noborder"
    :disabled="!isOn"
    :style="{ cursor: isOn ? 'pointer' : 'unset' }"
    @click="onClick"
  >
    <svg v-show="isOn" viewBox="0 0 32 32">
      <g fill="none">
        <path
          v-if="isPrev"
          d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"
        ></path>
        <path
          v-else
          d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"
        ></path>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.round-button-noborder {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 5px;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  border: none;
}

svg {
  padding-top: 3px;
  stroke: black;
  stroke-width: 3;
  overflow: visible;
}
</style>
