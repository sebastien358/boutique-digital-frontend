import type { RouteRecordRaw } from 'vue-router'
import OrderUser from '@/features/role-user/views/OrderUser.vue'

export const USER_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/orders' },
  { path: '/orders', component: OrderUser }
]
