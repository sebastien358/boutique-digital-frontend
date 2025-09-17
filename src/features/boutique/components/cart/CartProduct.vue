<template>
  <div class="cart-product">
    <div class="d-flex align-items-center space-between item">
      <h4>{{ product.title }}</h4>
      <div class="d-flex align-items-center">
        <span class="mr-20">x{{ product.quantity }}</span>
        <button @click="emit('removeFromCart', product.id)" class="btn btn-danger">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCartInterface } from '@/shared/interfaces';

defineProps<{
  product: ProductCartInterface
}>()

const emit = defineEmits<{
  (e: 'removeFromCart', id: number): void
}>()
</script>

<style scoped lang="scss">
.cart-product {
  .item {
    border: var(--border);
    border-radius: var(--border-radius);
    padding: 10px;
    margin: 6px 0 8px 0;
    h4 {
      font-size: 13px;
    }
    span {
      font-size: 14px;
    }
    .btn {
      padding: 11px;
      font-size: 10px;
    }
  }
}
</style>
