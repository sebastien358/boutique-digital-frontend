import { axiosAddToCart, axiosGetCarts, axiosRemoveFromToCart } from '@/shared/services/cart.service';
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
    totatBasket(state) {
      const initialValue = 0
      return state.cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        initialValue,
      )
    },
  },
  actions: {
    async getCarts() {
      try {
        const response = await axiosGetCarts()
        const productToCart: ProductCartInterface[] = Array.isArray(response) ? response : [response]
        this.cart = productToCart
      } catch (e) {
        console.error('Error: récupération des éléments du panier', e)
      }
    },
    async addToCart(id: number) {
      try {
        const productStore = useProductStore()
        const productExisting = productStore.products.find((p) => p.id === id)
        if (productExisting) {
          const item = {
            id: productExisting.id,
            title: productExisting.title,
            price: productExisting.price,
            quantity: 1
          }
          let itemToCart = [item]
          await axiosAddToCart(itemToCart)
          await this.getCarts()
        }
      } catch(e) {
        console.error('Error: ajout d\'produit dans le formulaire', e)
      }
    },
    async removeFromCart(id: number) {
      try {
        const itemExisting = this.cart.find((p) => p.id === id)
        if (itemExisting) {
          await axiosRemoveFromToCart(id)
          await this.getCarts()
        }
      } catch(e) {
        console.error('Error: supprimer un produit du panier', e)
      }
    }
  },
})


