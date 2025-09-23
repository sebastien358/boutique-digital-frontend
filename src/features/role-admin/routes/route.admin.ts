import type { RouteRecordRaw } from "vue-router";
import OrderAdmin from '@/features/role-admin/views/order/OrderAdmin.vue'
import ProductForm from '@/features/role-admin/views/product/ProductForm.vue'
import ProductList from '@/features/role-admin/views/product/ProductList.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/product-list' },
  { path: '/product-list', component: ProductList },
  { path: '/product-form', component: ProductForm },
  { path: '/product-edit/:id', name: 'edit', component: ProductForm },
  { path: '/command', component: OrderAdmin }

];
