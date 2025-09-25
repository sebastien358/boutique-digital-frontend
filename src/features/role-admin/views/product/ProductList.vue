<template>
  <div v-if="products.length > 0">
    <div class="scrollable product-list">
      <div class="products">
        <div v-for="product in products" :key="product.id" class="d-flex align-items-center space-between products-views">
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
            <router-link :to="{name: 'edit', params: {id: product.id}}" class="btn btn-success mr-5">Modifier</router-link>
            <button @click="openModal(product.id)" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
        <!-- Modal confirmation de suppression d\'un article --->
        <Modal :open="state.open" :productId="state.productId" @close="state.open = false" />
        <!-- pagination -->
        <Pagination
          @previousPage="previousPage()"
          @nextPage="nextPage()"
          :totalPages="totalPages"
          :currentPage="currentPage"
        />
      </div>
    </div>
  </div>
  <div v-else class="no-data">
    <p>Aucun produit à afficher pour le moment.</p>
  </div>
</template>

<script setup lang="ts">
import { useProductAdminStore } from '@/stores/admin/productAdminStore.ts'
import Modal from '@/components/modal/Modal.vue'
import { reactive, ref } from 'vue'
import { computed, onMounted } from 'vue'
import Pagination from '@/components/pagination/Pagination.vue'

const productAdminStore = useProductAdminStore()

const state = reactive<{
  open: boolean
  productId: number
}>({
  open: false,
  productId: 0
})

function openModal(id: number) {
  state.productId = id;
  state.open = true;
}

// Récupération des produits : STORE PRODUCT ADMIN

const products = computed(() =>
  productAdminStore.products
)
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(20)

async function loadProducts() {
  try {
    await productAdminStore.getProducts(currentPage.value, itemsPerPage.value)
  } catch (e) {
    console.error('Error: récupération des produits', e)
  }
}

async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
  try {
    await productAdminStore.getProducts(currentPage.value, itemsPerPage.value)
  } catch (e) {
    console.error(e)
  }
}

async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
  try {
    await productAdminStore.getProducts(currentPage.value, itemsPerPage.value)
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

const totalPages = computed(() =>
  Math.ceil(productAdminStore.totalItems / itemsPerPage.value)
)
</script>

<style scoped lang="scss">
@mixin center-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-list {
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

.no-data {
  @include center-page;
  p {
    color: var(--no-data);
    font-size: 14px;
  }
}

.spinner {
  height: 100%;
}

.products {
  .products-views {
    width: 100%;
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

