import Admin from '@/features/admin/Admin.vue'
import { ADMIN_ROUTES } from '@/features/admin/routes/index.admin'
import Login from '@/features/auth/components/Login.vue'
import Register from '@/features/auth/components/Register.vue'
import Boutique from '@/features/boutique/Boutique.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/boutique'},
    {path: '/boutique', component: Boutique},
    {
      path: '/admin', component: Admin, 
      children: ADMIN_ROUTES,
      meta: {requiresAuth: true}
    },
    {path: '/register', component: Register},
    {path: '/login', component: Login}
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({path: '/login'});
  } else {
    next();
  }
})

export default router
