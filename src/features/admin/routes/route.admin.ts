import type { RouteRecordRaw } from "vue-router";
import Order from '@/features/admin/views/order/Order.vue'
import ProductForm from '@/features/admin/views/ProductForm.vue'
import ProductList from '@/features/admin/views/ProductList.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/product-list' },
  { path: '/product-list', component: ProductList },
  { path: '/product-form', component: ProductForm },
  { path: '/product-edit/:id', name: 'edit', component: ProductForm },
  { path: '/command', component: Order }

];
