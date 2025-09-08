<template>
  <div class="app-content">
    <Header class="header" />
    <div class="views">
      <router-view v-slot="{Component}">
        <template v-if="Component">
          <Suspense>
            <Component :is="Component" />
          </Suspense>
        </template>
      </router-view>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped lang="scss">
.app-content {
  display: grid;
  grid-template-areas: 'header' 'views' 'footer';
  grid-template-rows: 45px 1fr 45px;
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
