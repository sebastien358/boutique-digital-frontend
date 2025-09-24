<template>
  <div class="d-flex flex-column order-list">
    <OrderDisplay v-for="order in orders" :key="order.id" :order="order" :showDeleteButton="showDeleteButton" />
  </div>
</template>

<script setup lang="ts">
import OrderDisplay from '@/components/order/OrderDisplay.vue'

defineProps<{
  orders: orders[],
  showDeleteButton: boolean
}>()
</script>

<style scoped lang="scss">
.order-list {
  row-gap: 15px;
}
</style>
