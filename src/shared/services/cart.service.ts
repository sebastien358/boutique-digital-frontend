// cartService.js
import axios from 'axios';

export async function axiosAddToCart(cart) {
  try {
    console.log(cart)
    const response = await axios.post('http://127.0.0.1:8000/api/cart', cart);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

function updateCartDisplay(data) {
    // Code pour mettre à jour l'affichage du panier
    // Par exemple, tu pourrais mettre à jour le nombre de produits dans le panier
    document.getElementById('cart-count').innerText = data.cartCount;
}

export async function axiosGetCart(cart) {
  try {
    const response = await axios.get('/api/cart');
  return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}


