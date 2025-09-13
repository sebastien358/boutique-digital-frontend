<template>
  <div>
    <Shop 
      :products="products" 
      @init-product-filters="initProductFilters" 
      @add-to-cart="addToCart"
    />
    <Cart />
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

const products = computed(() => productStore.products)

async function loadProducts() {
  try {
    await productStore.getProducts()
  } catch (e) {
    console.error('Erreur: récupération des produits', e)
  }
}

onMounted(async () => {
  try {
    await loadProducts()
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
</script>

<style scoped lang="scss"></style>
