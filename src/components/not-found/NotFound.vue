<template>
  <div class="d-flex align-items-center justify-content-center error-404">
    <div class="d-flex flex-column">
      <h1>Erreur 404 : Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas ou a été supprimée.</p>
      <router-link to="/boutique" class="btn-error-404">
        Revenir à la page d'accueil
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.error-404 {
  height: 100%;
  h1 {
    font-size: 36px;
    color: var(--danger-1);
    font-weight: bold;
  }
  p {
    font-size: 18px;
    color: var(--gray-3);
    margin: 8px 0 13px 0;
  }
  a {
    color: var(--text-primary-color);
  }
}
</style>
