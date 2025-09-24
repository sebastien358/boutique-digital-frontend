<template>
  <div class="d-flex align-items-center justify-content-center mt-10 pagination">
    <button @click="previousPage()" :class="{ 'btn-pagination': true }" :disabled="currentPage === 1">Précédent</button>
    <span>Page {{ currentPage }} - {{ totalPages }}</span>
    <button @click="nextPage()" :class="{ 'btn-pagination': true }" :disabled="currentPage === totalPages">Suivant</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalPages: number,
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'previousPage'): void
  (e: 'nextPage'): void
}>()

function previousPage() {
  try {
    emit('previousPage')
  } catch(e) {
    console.error(e)
  }
}

function nextPage() {
  try {
    emit('nextPage')
  } catch(e) {
    console.error(e)
  }
}
</script>

<style scoped lang="scss"></style>
