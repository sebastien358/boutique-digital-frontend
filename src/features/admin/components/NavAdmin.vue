<template>
  <nav class="nav-admin">
    <ul>
      <li>
        <router-link to="/product-form" class="btn btn-router-link">
          Ajouter un produit
        </router-link>
      </li>
      <li>
        <router-link to="/product-list" class="btn btn-router-link">
          Liste des produits
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

.nav-admin {
  border-right: var(--border);
  height: 100%;
  padding: 20px 12px 0 12px;
  ul > li {
    padding: 5px 0;
  }
}

.btn-router-link {
  border-radius: var(--border-radius);
  color: black;
  padding: 10px;
  border: 1px solid black;
  background: white;
  font-size: 12px;
}

.router-link-active {
  background: black;
  color: white;
  padding: 10px;
  text-decoration: none;
}

nav {
  ul {
    width: 100%;
  }
  ul > li {
    font-size: 14px;
    margin-bottom: 15px;
  }
}
</style>
