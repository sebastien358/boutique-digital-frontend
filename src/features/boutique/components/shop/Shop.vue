<template>
  <div class="shop">
    <!-- Filtrer les produits -->
    <ShopFilter
      v-if="state.open"
      :products="products"
      @init-product-filters="emit('initProductFilters')"
      class="shop-filter"
    />
    <!-- Affichage de   s produits -->
    <div class="d-flex flex-column">
      <button @click="state.open = !state.open" class="btn btn-primary">Filtrer les produits</button>
      <ShopProductList
        :products="products"
        :isLoggedIn="isLoggedIn"
        @add-to-cart="emit('addToCart', $event)"
        class="scrollable"
      />
    </div>
    <Calc :open="state.isMobile && state.open" @close="state.open = false" :transparent="true" />
  </div>
</template>

<script setup lang="ts">

import type { ProductInterface }from '@/shared/interfaces'
import ShopProductList from './ShopProductList.vue'
import ShopFilter from './ShopFilter.vue'
import { reactive } from 'vue'
import Calc from '@/components/Calc.vue'

const state = reactive<{
  open: boolean
  isMobile: boolean
}>({
  open: !window.matchMedia('(max-width: 575px)').matches,
  isMobile: window.matchMedia('(max-width: 575px)').matches
})

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
@use '@/assets/scss/mixins' as m;

.shop {
  display: grid;
  grid-template-columns: 1fr;
  @include m.lg {
    grid-template-columns: auto 1fr;
  }
  .shop-filter {
    padding: 15px 10px 10px 10px;
    background-color: rgba(0, 0, 0, 0.51);
    max-width: 270px;
    width: 100%;
    position: fixed;
    @include m.lg {
      position: relative;
      background-color: var(--gray-1);
      padding: 15px 10px 5px 10px;
    }
  }
  .btn-primary {
    margin: 10px;
    @include m.lg {
      display: none;
    }
  }
  .scrollable {
    padding: 0 12px 10px 12px;
    @include m.lg {
      padding: 12px 12px 10px 12px;
    }
    @include m.xl {
      padding: 15px 15px 10px 15px;
    }
    @include m.xxl {
      padding: 20px 20px 10px 20px;
    }
  }
}
</style>
