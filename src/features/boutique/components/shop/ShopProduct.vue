<template>
  <div class="shop-product">
    <div class="d-flex flex-column">
      <div v-if="product.pictures.length > 0"> 
        <img :src="product.pictures[0].url" class="img-product" /> 
      </div>
      <div v-else>
        <img src="../../../../assets/images/not-found.webp" class="img-product" />
      </div>
      <div class="d-flex flex-column shop-product_text">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <div class="d-flex align-items-center space-between">
          <strong>Prix : {{ product.price }}€</strong>
          <button class="btn btn-primary">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface }from '@/shared/interfaces'

defineProps<{
  product: ProductInterface
}>()
</script>

<style scoped lang="scss">
.shop-product {
  background-color: #ffffff;
  border: var(--border);
  border-radius: var(--border-radius);
  overflow: hidden;
  .img-product {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    border-bottom: var(--border);
    height: 350px;
  }
  &_text {
    padding: 10px;
    p {
      margin: 10px 0 10px 0;
    }
  }
}
</style>