<template>
  <div class="d-flex flex-column">
    <div v-if="products.length > 0" class="shop-product-list">
      <ShopProduct 
        v-for="product in products" 
        :product="product" 
        :key="product.id" 
        @add-to-cart="emit('addToCart', $event)" 
      />
    </div>
    <div v-else class="not-product">
      <p>Pas de produits disponibles pour le moment.</p>
    </div>
    <div v-if="products.length" class="d-flex justify-content-center mt-10">
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
@use '@/assets/scss/mixins' as mixin;

.shop-product-list {
  display: grid;
  grid-auto-rows: 475px;
  gap: 20px;  
  grid-template-columns: repeat(1, 1fr);
  @include mixin.lg {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mixin.xl {
    grid-template-columns: repeat(3, 1fr);
  }
  @include mixin.xxl {
    grid-template-columns: repeat(5, 1fr);
  }
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

