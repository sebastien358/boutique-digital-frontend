<template>
  <div>
    <Shop 
      :products="productStore.products" 
    />
  </div>
</template>

<script setup lang="ts">
import Shop from '../boutique/components/shop/Shop.vue'
import { useProductStore } from '@/stores/product'
import { onMounted } from 'vue'

// Load Products

const productStore = useProductStore();

async function loadProducts() {
  try {
    await productStore.getProducts();
  } catch(e) {
    console.error('Erreur: récupération des produits', e);
  }
}

onMounted(async () => {
  await loadProducts();
})
</script>

<style scoped lang="scss">
</style>
