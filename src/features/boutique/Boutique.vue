<template>
  <div>
    <Shop :products="products" @init-product-filters="initProductFilters" />
  </div>
</template>

<script setup lang="ts">
import Shop from '../boutique/components/shop/Shop.vue'
import { useProductStore } from '../../stores/productStore'
import { computed, onMounted } from 'vue'

// Load Products

const productStore = useProductStore()
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

// function initialisation

async function initProductFilters() {
  try {
    await productStore.initProductFilters()
  } catch (e) {
    console.error('Erreur de l\initialisation des produits', e)
  }
}
</script>

<style scoped lang="scss"></style>
../../stores/productStore
