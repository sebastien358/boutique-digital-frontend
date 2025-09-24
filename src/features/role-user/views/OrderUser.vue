<template>
  <div v-if="orders.length > 0" class="order-admin-store">
    <OrderList :orders="orders" :showDeleteButton="false" />
    <!-- pagination -->
    <Pagination
      @previousPage="previousPage()"
      @nextPage="nextPage()"
      :totalPages="totalPages"
      :currentPage="currentPage"
    />
  </div>
  <div v-else class="d-flex align-items-center justify-content-center no-order">
    <p>Aucune commande pour le moment.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Pagination from '@/components/pagination/Pagination.vue'
import OrderList from '@/components/order/OrderList.vue'
import { useCommandStore } from '@/stores/orderStore.ts'

defineProps<{
  showDeleteButton: boolean
}>()

const currentPage = ref<number>(1)
const itemPerPage = ref<number>(3)

const orderStore = useCommandStore()

const orders = computed(() => orderStore.order)

async function loadOrderUser() {
  try {
    await orderStore.getOrders(currentPage.value, itemPerPage.value)
  } catch (e) {
    console.error('Erreur de la récupération des commandes des clients', e)
  }
}

async function previousPage() {
  try {
  } catch(e) {
    console.error(e)
  }
}

async function nextPage() {
  try {
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
  Math.ceil(orderStore.totalOrders / itemPerPage.value)
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

