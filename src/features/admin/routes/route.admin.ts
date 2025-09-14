import type { RouteRecordRaw } from "vue-router";
import ProductForm from "../views/ProductForm.vue";
import ProductList from "../views/ProductList.vue";
import PayementProcessing from '@/features/boutique/components/cart/PayementProcessing.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/product-list' },
  { path: '/product-list', component: ProductList },
  { path: '/product-form', component: ProductForm },
  { path: '/product-edit/:id', name: 'edit', component: ProductForm },
  { path: '/payement', component: PayementProcessing }
];
