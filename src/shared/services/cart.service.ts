import axios from 'axios';

export async function axiosGetCarts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/item/list');
    if (response.status === 200) {
      console.log(response.data)
      return response.data;

    } else {
      throw new Error(`Erreur ${response.status}`);
    }
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
    const response = await axios.delete(`http://127.0.0.1:8000/api/item/delete/${id}`)
    return response.data
  } catch(e) {
    console.error('Error :', e)
  }
}

