<template>
  <div class="d-flex flex-column order-list">
    <OrderDisplay
      v-for="order in orders"
      :order="order"
      :key="order.id"
    />
  </div>
</template>

<script setup lang="ts">
import OrderDisplay from '@/features/admin/views/order/OrderDisplay.vue'

defineProps<{
  orders: Object
}>()
</script>

<style scoped lang="scss">
.order-list {
  row-gap: 15px;
}
</style>
