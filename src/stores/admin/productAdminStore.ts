import type { ProductFormInterface, ProductInterface } from '@/shared/interfaces'
import {
  axiosAdminDeleteProduct,
  axiosAdminGetProducts,
  axiosAdminProductNew,
} from '@/shared/services/admin/productAdmin.service'
import { defineStore } from 'pinia'
import { useProductStore } from '../productStore'

interface ProductState {
  products: ProductInterface[]
  isLoggedIn: boolean
  totalItems: number
}

export const useProductAdminStore = defineStore('productAdmin', {
  state: (): ProductState => ({
    products: [],
    isLoggedIn: true,
    totalItems: 0,
  }),
  actions: {
    async getAdminProducts(currentPage: number, itemsPerPage: number) {
      try {
        this.isLoggedIn = true
        const response = await axiosAdminGetProducts(currentPage, itemsPerPage)
        if (response) {
          const products = Array.isArray(response.products) ? response.products : [response.products];
          this.products = products;
          this.totalItems = response.total;
        } else {
          console.error('Erreur: la response est vide')
        }
      } catch (e) {
        console.error('Erreur: récupération des produits', e)
      } finally {
        this.isLoggedIn = false
      }
    },
    async deleteProduct(id: number) {
      try {
        const response = await axiosAdminDeleteProduct(id);
        const productStore = useProductStore();
        this.products = this.products.filter(p => p.id !== id);
        productStore.products = productStore.products.filter(p => p.id !== id);
      } catch(e) {
        console.error('Erreur: suppression d\'un produit', e);
      }
    },
    async newProduct(dataProduct: ProductFormInterface) {
      try {
        const { title, price, description, images, category } = dataProduct
        const formData = new FormData()
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        if (images && images.length > 0) {
          for (let image of images) {
            formData.append('filename[]', image)
          }
        }
        formData.append('category', category)
        const response = await axiosAdminProductNew(formData)
        const productStore = useProductStore()
        this.products.push(response)
        productStore.products.push(response)
      } catch (e) {
        console.error("Erreur: ajout d'un produit", e)
      }
    },
  },
})
