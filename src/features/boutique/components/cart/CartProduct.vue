<template>
  <div class="cart-product">
    <div class="d-flex align-items-center space-between item">
      <h4>Titre</h4>
      <div class="d-flex align-items-center">
        <span class="mr-20">x 1</span>
        <button class="btn btn-danger">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.cart-product {
  width: 420px;
  .item {
    border: var(--border);
    border-radius: var(--border-radius);
    padding: 10px;
    margin: 6px 0 8px 0;
    h4 {
      font-size: 14px;
    }
    span {
      font-size: 14px;
    }
    .btn {
      padding: 10px;
      font-size: 11px;
    }
  }
}
</style>