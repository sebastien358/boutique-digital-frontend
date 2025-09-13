// cartStore.js
import { axiosAddToCart, axiosGetCarts } from '@/shared/services/cart.service';
import { defineStore } from 'pinia';
import { useProductStore } from './productStore';
import type { ProductCartInterface } from '@/shared/interfaces/Cart.interface';

interface CartState {
  cart: ProductCartInterface[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cart: [],
  }),
  actions: {
    async getCarts() {
       try {
        const response = await axiosGetCarts();
        const productToCart: ProductCartInterface[] = Array.isArray(response) ? response : [response]
        this.cart.push(productToCart)
      } catch(e) {
        console.error('Erreur: récupération des éléments du panier', e)
      }
    },
    async addToCart(id: number) {
      try {
        const productStore = useProductStore()
        const productExisting = productStore.products.find((p) => p.id === id)
        if(productExisting) {
          const productToCart = {
            id: productExisting.id, 
            title: productExisting.title, 
            price: productExisting.price, 
            quantity: 1
          }
          axiosAddToCart([productToCart])
        }
      } catch(e) {
        console.error('Erreur: ajout d\'un produit dans le panier', e);
      }
    },
    async removeFromCart(productId: number) {
       try {
        this.cart = this.cart.filter((product) => product.id !== productId);
      } catch(e) {
        console.error(e)
      }
    },
    async clearCart() {
      try {
        this.cart = [];
      } catch(e) {
        console.error(e)
      }
    },
  },
});


     