import axios from 'axios';

export async function axiosGetItemsCart() {
  try {
    const response = await axios.get('http://localhost:8000/api/item/list')
    return response.data
  } catch(e) {
    console.error('Error :', e)
  }
}

export async function axiosAddToCart(itemToCart) {
  try {
    const response = await axios.post('http://localhost:8000/api/item/new', itemToCart)
    return response.data
  } catch(e) {
    console.error('Error :', e)
  }
}

export async function axiosRemoveItemFromCart(id: number) {
  try {
    const response = await axios.delete(`http://localhost:8000/api/item/delete/${id}`)
    return response.data
  } catch(e) {
    console.error('Error :', e)
  }
}
