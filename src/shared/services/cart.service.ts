import axios from 'axios';

export async function axiosGetCarts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/items');
    return response.data;
  } catch(e) {
    console.error('Error: ', e);
  }
}

export async function axiosAddToCart(itemToCart) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/item/new', itemToCart)
    return response.data
  } catch(e) {
    console.error('Error :', e)
  }
}

export async function axiosRemoveFromToCart(id: number) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/delete/item/${id}`)
    return response.data
  } catch(e) {
    console.error('Error :', e)
  }
}

