<template>
  <div>
    <CarProduct 
      @remove-from-cart="emit('removeFromCart', $event)"
      v-for="product of carts" :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductCartInterface } from '@/shared/interfaces';
import CarProduct from './CartProduct.vue'

defineProps<{
  carts: ProductCartInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeFromCart', id: number): void
}>()
</script>

<style scoped lang="scss">
</style>