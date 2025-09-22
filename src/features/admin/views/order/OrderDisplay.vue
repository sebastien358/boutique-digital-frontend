<template>
  <div class="order-display">
    <div class="d-flex flex-column mb-20">
      <strong>Prénom: <span>{{order.firstName}}</span></strong>
      <strong>Nom: <span>{{order.lastName}}</span></strong>
      <strong>Adresse: <span>{{order.address}}</span></strong>
      <strong>Code postal: <span>{{order.zipCode}}</span></strong>
      <strong>Ville: <span>{{order.country}}</span></strong>
      <strong>Téléphone: <span>{{order.phoneNumber}}</span></strong>
    </div>
    <div v-for="item in order.orderItems" :key="item.id" class="mb-20">
      <div class="d-flex flex-column">
        <strong>Model: <span>{{ item.product.title }}</span></strong>
        <strong>Description: <span>{{ item.product.description }}</span></strong>
        <strong>Price: <span>{{item.product.price}} €</span></strong>
      </div>
    </div>
    <div class="container-button">
      <button class="btn btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  order: Object
}>()
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.order-display {
  display: flex;
  flex-direction: column;
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 10px;
  line-height: 30px;
  @include m.lg {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  strong {
    font-size: 15px;
  }
  span {
    font-weight: normal;
  }
  .container-button {
    display: flex;
    justify-content: center;
    @include m.lg {
      display: flex;
      align-items: center;
    }
  }
}
</style>
