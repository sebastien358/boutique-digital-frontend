import axios from 'axios';

export async function axiosGetCarts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/carts');
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

export async function axiosAddToCart(cart) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/cart/new', cart);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}




