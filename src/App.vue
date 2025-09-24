<template>
  <div class="app-content">
    <TheHeader class="header" />
    <div class="views">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <Component :is="Component" />
          </Suspense>
        </template>
      </router-view>
    </div>
    <TheFooter class="footer hide-tablet" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/header/Header.vue'
import TheFooter from './components/footer/Footer.vue'
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.app-content {
  display: grid;
  grid-template-areas: 'header' 'views' 'footer';
  grid-template-rows: 48px auto 48px;
  height: 100vh;
  .header {
    grid-area: header;
  }
  .views {
    grid-area: views;
    height: calc(100vh - 48px);
    @include m.lg {
      height: calc(100vh - 96px);
      overflow-y: auto;
    }
  }
  .footer {
    grid-area: footer;
  }
}
</style>
