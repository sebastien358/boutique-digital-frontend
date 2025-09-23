<template>
  <div class="user">
    <NavUser class="nav-user" />
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
import NavUser from '@/features/role-user/components/NavUser.vue'
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.user {
  grid-template-columns: 1fr;
  height: 100%;
  @include m.lg {
    display: grid;
    grid-template-columns: 170px 1fr;
    height: 100%;
  }
  .nav-user {
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
