<template>
    <!-- Panier de la boutique -->
    <div class="basket">
      <div v-if="state.open" class="d-flex flex-column basket_content"> 
        <h2>Panier</h2>
          <CartProductList />
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

</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CartProductList from './CartProductList.vue'

const state = reactive<{
  open: boolean
}>({
  open: false
})
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
    background: #ffffff;
    border: var(--border);
    padding: 10px 10px 6px 10px;
    h2 {
      font-size: 19px;
    }
  }
}
</style>