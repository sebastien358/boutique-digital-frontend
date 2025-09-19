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
      <li>
        <router-link to="/command">
          <button class="btn btn-router-link">Liste des commandes</button>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.nav-admin {
  border-right: var(--border);
  background-color: rgba(0, 0, 0, 0.49);
  padding: 10px;
  @include m.lg {
    background-color: var(--gray-1);
    padding: 15px 12px 0 12px;
  }
  ul > li {
    padding: 3px 0;
    font-size: 14px;
  }
}

.container-font-awesome {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  .fa-rectangle-xmark {
    cursor: pointer;
    font-size: 19px;
    color: red;
  }
}

.btn-router-link {
  border-radius: var(--border-radius);
  color: var(--gray-3);
  padding: 10px;
  border: 1px solid var(--gray-3);
  background: white;
  font-size: 12px;
  transition: all 0.5s;
  cursor: pointer;
  width: 150px;
  &:hover {
    background-color: var(--gray-3);
    color: var(--text-primary-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
}

.router-link-active button {
  background-color: var(--gray-3);
  color: var(--text-primary-color);
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
  width: 150px;
  &:hover {
    background-color: var(--gray-3);
  }
}
</style>
