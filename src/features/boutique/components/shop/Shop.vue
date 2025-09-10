<template>
  <div class="shop">
    <ShopFilter 
      :products="products"
      class="shop-product-filter" 
    />
    <div class="d-flex flex-column">
      <ShopProductList 
        :products="products"
        class="scrollable"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface }from '@/shared/interfaces'
import ShopProductList from './ShopProductList.vue'
import ShopFilter from './ShopFilter.vue'

defineProps<{
  products: ProductInterface[]
}>()
</script>

<style scoped lang="scss">
.shop {
  display: grid;
  grid-template-columns: 240px auto;
}

.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
  padding: 20px 20px 10px 20px;
}

.shop-product-filter {
  padding: 10px 10px 5px 10px;
}
</style>