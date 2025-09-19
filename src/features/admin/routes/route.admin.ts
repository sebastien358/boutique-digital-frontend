import type { RouteRecordRaw } from "vue-router";
import Command from '@/features/admin/views/Command.vue'
import ProductForm from '@/features/admin/views/ProductForm.vue'
import ProductList from '@/features/admin/views/ProductList.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/product-list' },
  { path: '/product-list', component: ProductList },
  { path: '/product-form', component: ProductForm },
  { path: '/product-edit/:id', name: 'edit', component: ProductForm },
  { path: '/command', component: Command }

];
