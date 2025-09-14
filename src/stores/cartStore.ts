import { axiosAddToCart, axiosGetCarts, axiosRemoveFromCart } from '@/shared/services/cart.service';
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
        console.error('Erreur: récupération des éléments du panier', e)
      }
    },
    async addToCart(id: number) {
      try {
        const productStore = useProductStore()
        const productExisting = productStore.products.find((p) => p.id === id)
        if (productExisting) {
          const dataItemToCart = {
            id: productExisting.id,
            title: productExisting.title,
            price: productExisting.price,
            quantity: 1,
          }
          let itemToCart = [dataItemToCart]
          await axiosAddToCart(itemToCart)
          await this.getCarts()
        }
      } catch (e) {
        console.error("Erreur: ajout d'un produit dans le panier", e)
      }
    },
    async removeFromCart(id: number) {
      try {
        const itemExist = this.cart.find((p) => p.id === id)
        if (itemExist) {
          await axiosRemoveFromCart(id)
          await this.getCarts()
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
})


