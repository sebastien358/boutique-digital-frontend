<template>
  <div v-if="orders.length" class="order-admin-store">
    <OrderList :orders="orders" />
    <div class="d-flex flex-column">
      <div class="d-flex align-items-center justify-content-center mt-10">
        <button @click="previousPage()" class="btn-pagination" :disabled="currentPage === 0">Précédent</button>
        <span>Page {{ currentPage }} - {{ totalPages }}</span>
        <button @click="nextPage()" class="btn-pagination" :disabled="currentPage === totalPages">Suivant</button>
      </div>
    </div>
  </div>
  <div v-else class="d-flex align-items-center justify-content-center no-order">
    <p>Aucune commande pour le moment.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useOrderAdminStore } from '@/stores/admin/orderAdminStore.ts'
import OrderList from '@/features/admin/views/order/OrderList.vue'
const currentPage = ref<number>(1)
const itemPerPage = ref<number>(3)

const orderAdminStore = useOrderAdminStore()

const orders = computed(() => orderAdminStore.order)

async function loadOrderUser() {
  try {
    await orderAdminStore.getOrders(currentPage.value, itemPerPage.value)
  } catch (e) {
    console.error('Erreur de la récupération des commandes des clients', e)
  }
}

async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
  try {
    await orderAdminStore.getOrders(currentPage.value, itemPerPage.value)
  } catch(e) {
    console.error(e)
  }
}

async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
  try {
    await orderAdminStore.getOrders(currentPage.value, itemPerPage.value)
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await loadOrderUser()
  } catch (e) {
    console.log(e)
  }
})

const totalPages = computed(() =>
  Math.ceil(orderAdminStore.totalOrders / itemPerPage.value)
)
</script>

<style scoped lang="scss">
.order-admin-store {
  padding: 15px;
}

.no-order {
  height: 100%;
  p {
    color: var(--danger-1);
    font-weight: 500;
    font-size: 14px;
  }
}
</style>
