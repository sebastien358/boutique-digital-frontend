<template>
  <div class="shop-product">
    <div class="d-flex flex-column">
      <div v-if="product.pictures.length > 0">
        <img :src="product.pictures[0].url" alt="image du produit" class="img-product" />
      </div>
      <div v-else>
        <img src="@/assets/images/not-found.webp" class="img-product" />
      </div>
      <div class="d-flex flex-column shop-product_text">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <div class="d-flex align-items-center space-between">
          <strong>Prix : {{ product.price }}€</strong>
          <button @click="productFromCart(product.id)" class="btn btn-primary">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface }from '@/shared/interfaces'
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

defineProps<{
  product: ProductInterface
}>()

const emit = defineEmits<{
  (e: 'addToCart', id: number): void
}>()

function productFromCart(id: number) {
  if (authStore.isLoggedIn) {
    emit('addToCart', id)
  } else {
    router.push({ path: '/login' })
  }
}
</script>

<style scoped lang="scss">
.shop-product {
  background-color: var(--text-primary-color);
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
    h3 {
      font-size: 17px;
    }
    p {
      margin: 10px 0 10px 0;
      font-size: 15px;
    }
    strong {
      font-size: 13px;
    }
  }
}
</style>
