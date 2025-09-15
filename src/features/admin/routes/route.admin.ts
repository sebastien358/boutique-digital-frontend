import type { RouteRecordRaw } from "vue-router";
import ProductForm from "../views/ProductForm.vue";
import ProductList from "../views/ProductList.vue";
import PayementProcessing from '@/features/boutique/components/cart/PayementProcessing.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/product-list' },
  { path: '/product-list', component: ProductList }, // impossible de récupérer les articles ce cette page
  { path: '/product-form', component: ProductForm }, // On doit etre admin pour y accéder comme il est convenu dans le router, par contre...
  { path: '/product-edit/:id', name: 'edit', component: ProductForm },

];
