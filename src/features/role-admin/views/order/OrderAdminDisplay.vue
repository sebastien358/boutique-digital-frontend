<template>
  <div class="order-display">
    <div class="d-flex flex-column order-display_content">
      <strong>Prénom: <span>{{ order.firstName }}</span></strong>
      <strong>Nom: <span>{{ order.lastName }}</span></strong>
      <strong>Adresse: <span>{{ order.address }}</span></strong>
      <strong>Code postal: <span>{{ order.zipCode }}</span></strong>
      <strong>Ville: <span>{{ order.country }}</span></strong>
      <strong>Téléphone: <span>{{ order.phoneNumber }}</span></strong>
    </div>
    <div v-for="item in order.orderItems" :key="item.id">
      <div class="d-flex flex-column order-display_product">
        <strong>Model: <span>{{ item.product.title }}</span></strong>
        <strong>Description: <span>{{ item.product.description }}</span></strong>
        <strong>Price: <span>{{ item.product.price }} €</span></strong>
      </div>
    </div>
    <div class="container-button mt-10">
      <button @click="onClickDeleteOrder(order.id)" class="btn btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderAdminStore } from '@/stores/admin/orderAdminStore.ts'
const orderAdminStore = useOrderAdminStore()

defineProps<{
  order: Object
}>()

async function onClickDeleteOrder(id: number) {
  try {
    await orderAdminStore.deleteOrder(id)
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.order-display {
  display: flex;
  flex-direction: column;
  border: var(--border);
  border-radius: var(--border-radius);
  line-height: 30px;
  background-color: white;
  padding: 20px 15px 10px 15px;
  &_content {
    strong {
      font-size: 15px;
    }
    span {
      font-weight: normal;
    }
  }
  &_product {
    margin-top: 25px;
    strong {
      font-size: 15px;
    }
    span {
      font-weight: normal;
    }
  }
  .container-button {
    display: flex;
    justify-content: center;
    @include m.lg {
      justify-content: flex-end;
    }
  }
}
</style>
