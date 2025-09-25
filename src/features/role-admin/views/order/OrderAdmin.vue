<template>
  <div v-if="orders.length > 0" class="order-admin-store">
    <OrderList :orders="orders" :showDeleteButton="true" />
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
import { useOrderAdminStore } from '@/stores/admin/orderAdminStore.ts'
import Pagination from '@/components/pagination/Pagination.vue'
import OrderList from '@/components/order/OrderList.vue'

defineProps<{
  showDeleteButton: boolean
}>()

const currentPage = ref<number>(1)
const itemPerPage = ref<number>(3)

const orderAdminStore = useOrderAdminStore()

const orders = computed(() => orderAdminStore.order)

async function loadOrderUser() {
  try {
    await orderAdminStore.getOrders(currentPage.value, itemPerPage.value)
  } catch (e) {
    console.error('Error de la récupération des commandes', e)
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
    color: var(--no-data);
    font-size: 14px;
  }
}
</style>
