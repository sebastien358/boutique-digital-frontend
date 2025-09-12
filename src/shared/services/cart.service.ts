// cartService.js
import axios from 'axios';

export async function axiosAddToCart(cart) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/cart', cart);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

export async function axiosGetCart(cart) {
  try {
    const response = await axios.get('/api/cart');
  return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}


