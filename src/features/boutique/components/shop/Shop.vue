<template>
  <div class="shop">
    <!-- Filtrer les produits -->
    <ShopFilter
      :products="products"
      @init-product-filters="emit('initProductFilters')"
      class="shop-product-filter"
    />
    <!-- Affichage des produits -->
    <ShopProductList
      :products="products"
      :isLoggedIn="isLoggedIn"
      @add-to-cart="emit('addToCart', $event)"
      class="scrollable"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface }from '@/shared/interfaces'
import ShopProductList from './ShopProductList.vue'
import ShopFilter from './ShopFilter.vue'


defineProps<{
  products: ProductInterface[]
  isLoggedIn: boolean
}>()

const emit = defineEmits<{
  (e: 'initProductFilters'): void
  (e: 'addToCart', id: number): void
}>()
</script>

<style scoped lang="scss">
.shop {
  display: grid;
  grid-template-columns: 240px auto;
}

.scrollable {
  padding: 20px 20px 10px 20px;
}

.shop-product-filter {
  padding: 10px 10px 5px 10px;
}
</style>
