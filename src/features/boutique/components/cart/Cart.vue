<template>
  <!-- Panier de la boutique -->
  <div class="basket">
    <Transition mode="out-in">
    <div v-if="!state.open">
      <div @click="state.open = !state.open" class="basket_tooglebasket">
        <div class="count-cart">
          <span>{{ props.carts.length }}</span>
        </div>
        <font-awesome-icon icon="fa-solid fa-basket-shopping" />
      </div>
    </div>
    <div v-else class="d-flex flex-column basket_content"> 
      <h2>Panier</h2>
      <p :class="{'empty-basket': !props.carts.length, 'filled-basket': props.carts.length }">
        {{ props.carts.length ? 'Liste des éléments du panier :' : 'Votre panier est vide pour le moment.' }}
      </p>
      <!-- Composant données panier -->
      <CartProductList 
        @remove-from-cart="emit('removeFromCart', $event)"
        :carts="carts"
      />
      <button @click="goToPayement()" class="btn btn-success text-center">
        Commander ({{ props.totalBasket }})€
      </button> 
      <Calc :open="state.open" @close="state.open = false" :transparent="false" />
    </div>    
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CartProductList from './CartProductList.vue'
import Calc from '../../../../components/Calc.vue'
import type { ProductCartInterface } from '@/shared/interfaces';
import { useRouter } from 'vue-router';

const router = useRouter()

const state = reactive<{
  open: boolean
}>({
  open: false
})

const props = defineProps<{
  carts: ProductCartInterface[]
  totalBasket: number
}>()

const emit = defineEmits<{
  (e: 'removeFromCart', id: number): void
}>()

function goToPayement() {
  if (props.carts.length > 0) {
    router.push({path: '/payement'})
  } else {
    console.error('Votre panier est vide')
  }
}
</script>

<style scoped lang="scss">
.basket {
  z-index: 1;
  position: fixed;
  bottom: 20px;
  right: 20px;
  &_tooglebasket {
    cursor: pointer;
    position: relative;
    width: 65px;
    height: 65px;
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

.v-leave-to,
.v-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.v-leave-active,
.v-enter-active {
  transition: all 0.3s;
}
</style>