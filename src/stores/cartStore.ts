
import type { ProductCartInterface } from '@/shared/interfaces/Cart.interface';
import { axiosAddProductFromCartExisting, axiosAddToCart, axiosGetCartItems, axiosRemoveFromCart } from '@/shared/services/cart.service.ts'
import { useProductStore } from '@/stores/productStore.ts'
import { defineStore } from 'pinia';

interface CartState {
  cart: ProductCartInterface[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cart: [],
  }),
  getters: {
    totalBasket(state) {
      const initialValue = 0
      return state.cart.reduce((acc, product) =>
        acc + product.price * product.quantity, initialValue)
    }
  },
  actions: {
    async getCartItems() {
      try {
        const response = await axiosGetCartItems()
        if (response) {
          const products: ProductCartInterface[] = Array.isArray(response) ? response : [response]
          this.cart = products
        } else {
          console.error('Error: La réponse est vide')
        }
      } catch(e) {
        console.error('Error: récupération des produits', e)
      }
    },
    async addToCart(id: number) {
      try {
        const productStore = useProductStore()
        const productExisting = productStore.products.find((p) => p.id === id)
        if (productExisting) {
          const productToCart = {
            id: productExisting.id,
            title: productExisting.title,
            price: productExisting.price,
            quantity: 1
          }
          await axiosAddToCart([productToCart])
          await this.getCartItems()
        }
      } catch(e) {
        console.error('Error: ajouter d\'un produit au panier', e)
      }
    },
    async removeFromCart(id: number) {
      try {
        const productToCarExisting = this.cart.find((p) => p.id === id)
        if (productToCarExisting) {
          await axiosRemoveFromCart(id)
          await this.getCartItems()
        }
      } catch(e) {
        console.error('Error: suppression d\'un produit du panier', e)
      }
    },
    async addProductFromCartExisting(id: number) {
      try {
        const productExisting = this.cart.find((p) => p.id === id)
        if (productExisting) {
          await axiosAddProductFromCartExisting(id)
          await this.getCartItems()
        }
      } catch(e) {
        console.error('Error: ajout d\'un produit existant au panier', e)
      }
    }
  },
})


