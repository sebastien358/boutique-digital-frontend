<template>
  <Teleport v-if="open" to="body">
    <div @click="emit('close')" class="calc" :class="{ transparent }"></div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  transparent: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped lang="scss">
.calc {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #00000073;
}

.transparent {
  background-color: transparent;
}
</style>