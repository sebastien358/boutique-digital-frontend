<template>
  <!-- Panier de la boutique -->
  <div class="basket">
    <div v-if="!state.open">
      <div @click="state.open = !state.open" class="basket_tooglebasket">
        <div class="count-cart">
          <span>{{ carts.length }}</span>
        </div>
        <font-awesome-icon icon="fa-solid fa-basket-shopping" />
      </div>
    </div>
    <div v-else class="d-flex flex-column basket_content"> 
      <h2>Panier</h2>
      <p :class="{'empty-basket': !carts.length, 'filled-basket': carts.length }">
        {{ carts.length ? 'Liste des éléments du panier' : 'Votre panier est vide pour le moment.' }}
      </p>
      <CartProductList 
        @remove-from-cart="emit('removeFromCart', $event)"
        :carts="carts"
      />
      <button class="btn btn-success">Commander ({{ totalBasket }})€</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CartProductList from './CartProductList.vue'
import type { ProductCartInterface } from '@/shared/interfaces';

const state = reactive<{
  open: boolean
}>({
  open: false
})

defineProps<{
  carts: ProductCartInterface[]
  totalBasket: number
}>()

const emit = defineEmits<{
  (e: 'removeFromCart', id: number): void
}>()
</script>

<style scoped lang="scss">
.basket {
  position: fixed;
  bottom: 20px;
  right: 20px;
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
    width: 450px;
    background: #ffffff;
    border: var(--border);
    padding: 15px 10px 6px 10px;
    h2 {
      font-size: 18px;
    }
    .empty-basket, 
    .filled-basket {
      font-size: 12px;
      font-weight: 500;
    }
    .empty-basket {
      margin: 5px 0 10px 0; 
      color: var(--danger-1);
      text-align: center;
    }
    .filled-basket {
      margin: 6px 0 5px 0; 
      color: var(--gray-3);
    }
  }
}
</style>