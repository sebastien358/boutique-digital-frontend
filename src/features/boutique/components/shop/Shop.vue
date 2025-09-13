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
      @add-to-cart="emit('addToCart', $event)"
      class="scrollable"
    />    
    <!-- Panier de la boutique -->
    <div class="basket">
      <div v-if="state.open" class="d-flex flex-column basket_content"> 
        <Cart />
        <button class="btn btn-success">Ajouter au panier ()€</button>
      </div>
      <div v-else>
        <div @click="state.open = !state.open" class="basket_tooglebasket">
          <div class="count-cart">
            <span>1</span>
          </div>
          <font-awesome-icon icon="fa-solid fa-basket-shopping" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface }from '@/shared/interfaces'
import ShopProductList from './ShopProductList.vue'
import ShopFilter from './ShopFilter.vue'
import Cart from '../cart/Cart.vue'
import { reactive } from 'vue';

const state = reactive<{
  open: boolean
}>({
  open: false
})

defineProps<{
  products: ProductInterface[]
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

.basket {
  position: fixed;
  bottom: 30px;
  right: 30px;
  &_tooglebasket {
    cursor: pointer;
    position: relative;
    width: 60px;
    height: 60px;
    background: var(--primary-1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_tooglebasket > .fa-basket-shopping {
    font-size: 17px;
    color: var(--text-primary-color);
  }
  &_tooglebasket > .count-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--danger-1);
    top: 0;
    right: 5px;
  }
  &_tooglebasket > .count-cart > span {
    color: var(--text-primary-color);
    font-size: 9px;
  }
  &_content {
    background: #ffffff;
    border: var(--border);
    padding: 10px 10px 6px 10px;
  }
}
</style>