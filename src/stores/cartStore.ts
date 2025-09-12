// cartStore.js
import { axiosAddToCart } from '@/shared/services/cart.service';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
    async addToCart(product) {
      try {
        const existingProduct = this.cart.find((item) => item.id === product.id);
        let productToAdd;
        if (existingProduct) {
          existingProduct.quantity += 1;
          productToAdd = { id: product.id, title: product.title, price: product.price, quantity: 1 };
        } else {
          const cart = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
          }
          this.cart.push(cart);
          productToAdd = cart;
        }
        await axiosAddToCart([productToAdd]);
      } catch(e) {
        console.error('Erreur: ajout d\'un produit dans le panier', e)
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


     