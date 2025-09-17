import type { ProductFormInterface, ProductInterface } from '@/shared/interfaces'
import {
  axiosAdminDeleteImage,
  axiosAdminDeleteProduct,
  axiosAdminGetCurrentProduct,
  axiosAdminGetProducts,
  axiosAdminProductEdit,
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
    async getProducts(currentPage: number, itemsPerPage: number) {
      try {
        this.isLoggedIn = true
        const response = await axiosAdminGetProducts(currentPage, itemsPerPage)
        if (response) {
          const products: ProductInterface[] = Array.isArray(response.products) ? response.products : [response.products];
          this.products = products;
          this.totalItems = response.total;
        } else {
          console.log('Error: la response est vide')
        }
      } catch (e) {
        console.error('Error: récupération des produits', e)
      } finally {
        this.isLoggedIn = false
      }
    },
    async getCurrentProduct(id: number) {
      try {
        return await axiosAdminGetCurrentProduct(id);
      } catch(e) {
        console.error('Error : récupération d\'un produit', e);
      }
    },
    async deleteProduct(id: number) {
      try {
        const response = await axiosAdminDeleteProduct(id);
        const productStore = useProductStore();
        this.products = this.products.filter(p => p.id !== id);
        productStore.products = productStore.products.filter(p => p.id !== id);
      } catch(e) {
        console.error('Error: suppression d\'un produit', e);
      }
    },
    async deleteImage(productId: number, pictureId: number) {
      try {
        return await axiosAdminDeleteImage(productId, pictureId);
      } catch(e) {
        console.error('Error: suppression d\'un produit', e);
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
          for (const image of images) {
            formData.append('filename[]', image)
          }
        }
        formData.append('category', category)
        const response = await axiosAdminProductNew(formData)
        const productStore = useProductStore()
        this.products.push(response)
        productStore.products.push(response)
      } catch (e) {
        console.error("Error: ajout d'un produit", e)
      }
    },
    async updateProduct(dataProduct: ProductFormInterface, id: number) {
      try {
        const { title, price, description, images, category } = dataProduct
        const formData = new FormData()
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        if (images && images.length > 0) {
          const newImages = images.filter(image => image instanceof File)
          for (const image of newImages) {
            formData.append('filename[]', image)
          }
        }
        formData.append('category', category)
        const response = await axiosAdminProductEdit(formData, id)
        const productStore = useProductStore()
        const productIndex = productStore.products.findIndex(p => p.id === id)
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...response };
          this.products[index].images = response.pictures
        }
        if (productIndex !== -1) {
          productStore.products[productIndex] = { ...productStore.products[productIndex], ...response };
          productStore.products[productIndex].images = response.pictures
        }
      } catch(e) {
        console.error('Error: modification d\'un produit', e)
      }
    }
  }
})
