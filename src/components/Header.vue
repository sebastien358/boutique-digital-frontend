<template>
  <header class="d-flex align-items-center space-between">
    <div class="d-flex align-items-center">
      <router-link to="/boutique" class="d-flex align-items-center mr-20 router-link-title">
        <img src="@/assets/images/logo.svg" />
        <h1>DigitalShop</h1>
      </router-link>
      <ul class="d-flex align-items-center hide-tablet">
        <li class="mr-10">
          <router-link to="/boutique">Boutique</router-link>
        </li>
        <li>
          <router-link to="/admin">Admin</router-link>
        </li>
      </ul>
    </div>
    <div class="hide-tablet">
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
    </div>
    <!-- Menu Tablet -->
    <div class="container-menu">
      <font-awesome-icon @click="state.open = !state.open" icon="fa-solid fa-bars" />
      <Transition>   
      <ul v-if="state.open" class="menu-tablet">
        <li>
          <router-link to="/boutique">Boutique</router-link>
        </li>
        <li>
          <router-link to="/admin">Admin</router-link>
        </li>
        <div v-if="!authStore.isLoggedIn">
          <li>
            <router-link to="/register">Inscription</router-link>
          </li>
          <li>
            <router-link to="/login" class="login">Connexion</router-link>
          </li>
        </div>
        <div v-else>
          <li>
            <a @click="onClickLogout()" class="logout" href="#">Déconnexion</a>
          </li>
        </div>
      </ul>      
      </Transition>
      <Calc :open="state.open" @close="state.open = false" :transparent="true" />
    </div>
  </header>
</template>

<script setup lang="ts">
import Calc from './Calc.vue'
import { reactive } from 'vue';
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const state = reactive<{
  open: boolean
}>({
  open: false
})

const authStore = useAuthStore()
const router = useRouter()

function onClickLogout() {
  authStore.logout(router)
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as mixin;

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

.container-menu {
  z-index: 1;
  position: relative;
  .fa-bars {
    cursor: pointer;
    color: white;
    font-size: 20px;
  }
  @include mixin.lg {
    display: none;
  }
  .menu-tablet {
    position: absolute;
    padding: 15px 30px;
    background: var(--text-primary-color);
    right: -5px;
    top: 40px;
    line-height: 32px;
    a {
      color: var(--gray-3);
      font-size: 15px;
    }
    .login {
      color: green;
      font-weight: 500;
    }
    .logout {
      color: var(--danger-1);
      font-weight: 500;
    }
  }
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

