<template>
  <header class="d-flex align-items-center space-between">
    <div class="d-flex align-items-center">
      <router-link to="/boutique" class="d-flex align-items-center mr-20">
        <img src="@/assets/images/logo.svg" />
        <h1>Boutique</h1>
      </router-link>

      <nav>
        <ul class="d-flex align-items-center">
          <li class="mr-10">
            <router-link to="/boutique">Boutique</router-link>
          </li>
          <li>
            <router-link to="/admin">Admin</router-link>
          </li>
        </ul>
      </nav>
    </div>

    <nav v-if="!authStore.isLoggedIn">
      <ul class="d-flex align-items-center">
        <li class="mr-10">
          <router-link to="/register">Inscription</router-link>
        </li>
        <li>
          <router-link to="/login">Connexion</router-link>
        </li>
      </ul>
    </nav>
    <nav v-else>
      <ul>
        <li>
          <a @click="onClickLogout()" href="#">Déconnexion</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function onClickLogout() {
  authStore.logout(router);
}
</script>

<style scoped lang="scss">
header {
  background-color: var(--primary-1);
  padding: 0 10px;
  a {
    text-decoration: none;
    color: var(--text-primary-color);
  }
  img {
    height: 25px;
    width: 25px;
  }
  h1 {
    color: var(--text-primary-color);
    font-size: 19px;
  }
}
</style>