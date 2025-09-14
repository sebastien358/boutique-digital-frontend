import Admin from '@/features/admin/Admin.vue'
import { ADMIN_ROUTES } from '@/features/admin/routes/route.admin.ts'
import Login from '@/features/auth/components/Login.vue'
import Register from '@/features/auth/components/Register.vue'
import Boutique from '@/features/boutique/Boutique.vue'
import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'
import PayementProcessing from '@/features/boutique/components/cart/PayementProcessing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/boutique' },
    { path: '/boutique', component: Boutique },
    {
      path: '/admin',
      component: Admin,
      meta: { requiresAdmin: true },
      children: ADMIN_ROUTES
    },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/payement', meta: { requiresUser: true }, component: PayementProcessing }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ path: '/login' })
  } else if(to.meta.requiresAdmin && (!authStore.userRole || !authStore.userRole.includes('ROLE_ADMIN'))) {
    next({ path: '/' })
  } else if(to.meta.requiresUser && (!authStore.userRole || !authStore.userRole.includes('ROLE_USER'))) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
