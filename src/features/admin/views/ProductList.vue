<template>
  <div v-if="!isLoggedIn" class="product-list">
    <div v-if="products && products.length > 0">
      <div class="scrollable">
        <div class="products">
          <div
            v-for="product in products"
            :key="product.id"
            class="d-flex align-items-center space-between products-views"
          >
            <div class="d-flex align-items-center">
              <div v-if="product.pictures && product.pictures.length > 0">
                <img :src="product.pictures[0].url" class="img-product" />
              </div>
              <div v-else>
                <img src="@/assets/images/not-found.webp" class="img-product" />
              </div>
              <h4>{{ product.title }}</h4>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn btn-success mr-5">Modifier</button>
              <button class="btn btn-danger">Supprimer</button>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center pagination">
            <button
              @click="previousPage()"
              :class="{ 'btn-pagination': true }"
              :disabled="currentPage === 1"
            >
              Précédent
            </button>
            <span>Page {{ currentPage }} - {{ totalPages }}</span>
            <button
              @click="nextPage()"
              :class="{ 'btn-pagination': true }"
              :disabled="currentPage === totalPages"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-product">
      <p>Aucun produit à afficher pour le moment.</p>
    </div>
  </div>
  <div v-else class="spinner">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">
import { useProductAdminStore } from '../../../stores/admin/productAdminStore'
import { ref } from 'vue'
import { computed, onMounted } from 'vue'

// Récupération des produits : STORE PRODUCT ADMIN

const productAdminStore = useProductAdminStore()
const isLoggedIn = computed(() => productAdminStore.isLoggedIn)
const products = computed(() => productAdminStore.products)
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(20)

async function loadProducts() {
  try {
    await productAdminStore.getAdminProducts(currentPage.value, itemsPerPage.value)
  } catch (e) {
    console.error('Erreur: récupération des produits', e)
  }
}

async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
  try {
    await productAdminStore.getAdminProducts(currentPage.value, itemsPerPage.value)
  } catch (e) {
    console.error(e)
  }
}

async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
  try {
    await productAdminStore.getAdminProducts(currentPage.value, itemsPerPage.value)
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await loadProducts()
  } catch (e) {
    console.error(e)
  }
})

const totalPages = computed(() => Math.ceil(productAdminStore.totalItems / itemsPerPage.value))
</script>

<style scoped lang="scss">
@mixin center-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-list {
  @include center-page;
  .products {
    padding: 20px;
    display: grid;
    row-gap: 10px;
  }
  .products > .pagination {
    margin-top: 10px;
  }
  .products > .pagination > span {
    font-size: 14px;
  }
}

.no-product {
  @include center-page;
  p {
    color: #95a5a6;
    font-size: 14px;
  }
}

.spinner {
  @include center-page;
}

.products {
  width: 1400px;
  .products-views {
    display: grid;
    grid-template-columns: 1fr auto;
    background: white;
    padding: 10px;
    border-radius: var(--border-radius);
    .img-product {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
../../../stores/admin/productAdminStore
