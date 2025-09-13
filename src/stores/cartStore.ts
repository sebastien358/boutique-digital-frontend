// cartStore.js
import { axiosAddToCart } from '@/shared/services/cart.service';
import { defineStore } from 'pinia';
import { useProductStore } from './productStore';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
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


     