<template>
  <div class="admin">
    <NavAdmin class="nav-admin" />
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
@use '@/assets/scss/mixins' as m;

.admin {
  grid-template-columns: 1fr;
  height: 100%;
  @include m.lg {
    display: grid;
    grid-template-columns: 170px 1fr;
    height: 100%;
  }
  .nav-admin {
    position: absolute;
    @include m.lg {
      position: relative;
    }
  }
  .views {
    height: 100%;
  }
}
</style>
