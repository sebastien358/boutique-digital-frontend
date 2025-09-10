<template>
  <nav class="nav-admin">
    <ul>
      <li>
        <router-link to="/product-form">Ajouter un produit</router-link>
      </li>
      <li>
        <router-link to="/product-list">Liste des produits</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scope lang="scss">
.nav-admin {
  border-right: var(--border);
  height: 100%;
  padding: 10px;
}

nav {
  ul > li {
    font-size: 14px;
    margin-bottom: 6px;
  }
}
</style>