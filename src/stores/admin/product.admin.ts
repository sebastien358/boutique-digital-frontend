import type { ProductFormInterface, ProductInterface } from "@/shared/interfaces";
import { axiosAdminProductNew } from "@/shared/services/admin/productAdmin.service";
import { defineStore } from "pinia";
import { useProductStore } from "../product";

interface ProductState {
  products: ProductInterface[]
}

export const useAdminProductStore = defineStore('product', {
  state: (): ProductState  => ({
    products: []
  }),
  actions: {
    async newProduct(dataProduct: ProductFormInterface) {
      try {
        const { title, price, description, images, category } = dataProduct;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        if (images && images.length > 0) {
          for (let image of images) {
            formData.append('filename[]', image);
          }
        }
        formData.append('category', category);
        const response = await axiosAdminProductNew(formData);
        const productStore = useProductStore();
        this.products.push(response);
        productStore.products.push(response);
      } catch(e) {
        console.error('Erreur: ajout d\'un produit', e);
      }
    }
  }
});