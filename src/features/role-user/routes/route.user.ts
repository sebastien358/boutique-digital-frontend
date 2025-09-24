import type { RouteRecordRaw } from 'vue-router'
import OrderUser from '@/features/role-user/views/OrderUser.vue'
import PayementProcessing from '@/features/boutique/components/cart/PayementProcessing.vue'

export const USER_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/orders' },
  { path: '/orders', component: OrderUser },
  { path: '/payment', component: PayementProcessing },
]
