<template>
  <div>
    <Shop
      @init-product-filters="initProductFilters"
      @add-to-cart="addToCart"
      :products="products"
      :isLoggedIn="isLoggedIn"
    />
    <Cart
      @remove-from-cart="removeFromCart"
      :totalBasket="cartStore.totalBasket"
      :carts="carts"
    />
  </div>
</template>

<script setup lang="ts">
import Shop from '../boutique/components/shop/Shop.vue'
import Cart from './components/cart/Cart.vue'
import { useProductStore } from '../../stores/productStore'
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore';

const productStore = useProductStore()
const cartStore = useCartStore()

// Load Products

const products = computed(() =>
  productStore.products
)
const isLoggedIn = computed(() =>
  productStore.isLoading
)

async function loadProductList() {
  try {
    await productStore.getProducts()
  } catch (e) {
    console.error('Erreur: récupération des produits', e)
  }
}

onMounted(async () => {
  try {
    await loadProductList()
  } catch (e) {
    console.error(e)
  }
})

// Load Items Cart

const carts = computed(() => cartStore.cart)

async function loadItemsCart() {
  try {
    await cartStore.getCarts()
  } catch (e) {
    console.error('Erreur: récupération des éléments du panier', e)
  }
}

onMounted(async () => {
  try {
    await loadItemsCart()
  } catch (e) {
    console.error(e)
  }
})

// Événenement :  initialisation de la filtration des produits au clic

async function initProductFilters() {
  try {
    await productStore.initProductFilters()
  } catch (e) {
    console.error(e)
  }
}

// Événement : ajouter un produit au panier au clic

async function addToCart(id: number) {
  try {
    await cartStore.addToCart(id)
  } catch(e) {
     console.error(e)
  }
}

// Événement : supprimer un produit du panier

async function removeFromCart(id: number) {
  try {
    await cartStore.removeFromCart(id)
  } catch(e) {
    console.error(e)
  }
}
</script>

<style scoped lang="scss">
</style>
