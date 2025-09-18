import { axiosAddToCart, axiosGetItemsCart, axiosRemoveItemFromCart } from '@/shared/services/cart.service';
import { defineStore } from 'pinia';
import type { ProductCartInterface } from '@/shared/interfaces/Cart.interface';
import { useProductStore } from '@/stores/productStore.ts'

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
      return state.cart.reduce((acc, product) => acc + product.price * product.quantity, initialValue)
    }
  },
  actions: {
    async getCarts() {
      try {
        const response = await axiosGetItemsCart()
        if (response) {
          const products: ProductCartInterface[] = Array.isArray(response) ? response : [response]
          this.cart = products || []
        } else {
          console.error('La response est vide')
        }
      } catch(e) {
        console.error('Error: récupération des produits du panier', e)
      }
    },
    async addToCart(id: number) {
      try {
        const productStore = useProductStore()
        const productExisting = productStore.products.find((p) => p.id === id)
        if (productExisting) {
          const itemToCart = {
            id: productExisting.id,
            title: productExisting.title,
            price: productExisting.price,
            quantity: 1,
          }
          await axiosAddToCart([itemToCart])
          await this.getCarts()
        }
      } catch(e) {
        console.error('Error: ajout d\'un produit au panier', e)
      }
    },
    async removeFromCart(id: number) {
      try {
        const itemExisting = this.cart.find((p) => p.id === id)
        if (itemExisting) {
          await axiosRemoveItemFromCart(id)
          await this.getCarts()
        }
      } catch(e) {
        console.error('Error: suppression d\'un produit', e)
      }
    }
  },
})


