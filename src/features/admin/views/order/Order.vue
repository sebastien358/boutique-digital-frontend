<template>
  <div>
    <OrderList
      :orders="orders"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useOrderAdminStore } from '@/stores/admin/orderAdminStore.ts'
import OrderList from '@/features/admin/views/order/OrderList.vue'

const orderAdminStore = useOrderAdminStore()

const orders = computed(() => orderAdminStore.order)

async function loadOrderUser() {
  try {
    await orderAdminStore.getOrders()
  } catch(e) {
    console.error('Erreur de la récupération des commandes des clients', e)
  }
}

onMounted(async () => {
  try {
    await loadOrderUser()
  } catch(e) {
    console.log(e)
  }
})
</script>

<style scoped lang="scss"></style>
