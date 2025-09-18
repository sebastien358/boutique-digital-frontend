<template>
  <nav class="nav-admin">
    <ul>
      <li>
        <router-link to="/product-form">
          <button class="btn btn-router-link">Ajouter un produit</button>
        </router-link>
      </li>
      <li>
        <router-link to="/product-list">
          <button class="btn btn-router-link">Liste des produits</button>
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
    padding: 3px 0;
    font-size: 14px;
  }
  .btn-router-link {
    border-radius: var(--border-radius);
    color: #7b38d8;
    padding: 10px;
    border: 1px solid #7b38d8;
    background: white;
    font-size: 12px;
    width: 100%;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background-color: #7b38d8;
      color: #eeeeee;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }
  .router-link-active button {
    background-color: #7b38d8;
    color: #eeeeee;
    text-decoration: none;
    width: 100%;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: darken(#7b38d8, 10%);
    }
  }
}



</style>
