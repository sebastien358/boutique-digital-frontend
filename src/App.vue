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
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.app-content {
  display: grid;
  grid-template-areas: 'header' 'views' 'footer';
  grid-template-rows: 48px auto 48px;
  height: 100vh;
}

.header {
  grid-area: header;
}

.views {
  grid-area: views;
}

.footer {
  grid-area: footer;
}
</style>
