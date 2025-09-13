<template>
  <header class="d-flex align-items-center space-between">
    <div class="d-flex align-items-center">
      <router-link to="/boutique" class="d-flex align-items-center mr-20 router-link-title">
        <img src="@/assets/images/logo.svg" />
        <h1>DigitalShop</h1>
      </router-link>

      <div>
        <ul class="d-flex align-items-center">
          <li class="mr-10">
            <router-link to="/boutique">Boutique</router-link>
          </li>
          <li>
            <router-link to="/admin">Admin</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="!authStore.isLoggedIn">
      <ul class="d-flex align-items-center">
        <li class="mr-10">
          <router-link to="/register">Inscription</router-link>
        </li>
        <li>
          <router-link to="/login">Connexion</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li>
          <a @click="onClickLogout()" href="#">Déconnexion</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function onClickLogout() {
  authStore.logout(router)
}
</script>

<style scoped lang="scss">
header {
  background-color: var(--primary-1);
  padding: 0 10px;
  .router-link-title {
    text-decoration: none;
  }
  a {
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
@/stores/authStore
