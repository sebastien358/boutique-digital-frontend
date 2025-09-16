<template>
  <div class="admin">
    <NavAdmin />
    <div class="views">
      <router-view v-slot="{Component, route}">
        <template v-if="Component">
          <Component :is="Component" :key="route.fullPath" />
        </template>
        </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavAdmin from './components/NavAdmin.vue'
</script>

<style scoped lang="scss">
.admin {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
}

.views {
  height: 100%;
}
</style>
