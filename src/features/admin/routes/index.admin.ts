import type { RouteRecordRaw } from "vue-router";
import ProductForm from "../views/ProductForm.vue";
import ProductList from "../views/ProductList.vue";

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  {path: '', redirect: '/product-form'},
  {path: '/product-form', component: ProductForm},
  {path: '/product-edit/:id', name: 'edit', component: ProductForm},
  {path: '/product-list', component: ProductList}
];