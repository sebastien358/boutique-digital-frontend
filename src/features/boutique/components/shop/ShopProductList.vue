<template>
  <div class="d-flex flex-column align-items-center">
    <div v-if="products.length > 0" class="shop-product-list">
      <ShopProduct v-for="product in products" :product="product" :key="product.id" @add-to-cart="emit('addToCart', $event)" />
    </div>
    <div v-else class="not-product">
      <p>Pas de produits disponibles pour le moment.</p>
    </div>
    <div v-if="products.length" class="mt-10">
      <button @click="productStore.loadProducts()" class="btn btn-primary">
        Plus de produits...
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '../../../../stores/productStore'
import type { ProductInterface } from '@/shared/interfaces'
import ShopProduct from './ShopProduct.vue'

const productStore = useProductStore()

defineProps<{
  products: ProductInterface[]
}>()

const emit = defineEmits<{
  (e: 'addToCart', id: number): void
}>()
</script>

<style scoped lang="scss">
.shop-product-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 475px;
  gap: 20px;
}

.not-product {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  p {
    font-size: 14px;
    color: #718093;
  }
}
</style>

