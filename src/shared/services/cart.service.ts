import axios from 'axios';
import type { ProductCartInterface } from '@/shared/interfaces'

const BASE_URL = 'http://localhost:8000/api/item'

export async function axiosAddToCart(productToCart: any[]): Promise<any> {
  try {
    const response = await axios.post(`${BASE_URL}/new`, productToCart)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      return null
    }
  } catch(e) {
    console.error('Error server', e)
    throw e
  }
}

export async function axiosGetCartItems(): Promise<ProductCartInterface[]> {
  try {
    const response = await axios.get(`${BASE_URL}/list`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      return false
    }

  } catch(e) {
    console.error('Error server', e)
    throw e
  }
}

export async function axiosRemoveFromCart(id: number): Promise<ProductCartInterface[]> {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`)
    if (response.status === 204 || response.status === 200) {
      return response.data
    } else {
      return false
    }

  } catch(e) {
    console.error('Error server', e)
    throw e
  }
}

export async function axiosAddProductFromCartExisting(id: number) {
  try {
    const response = await axios.post(`${BASE_URL}/add/${id}`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      return false
    }
  } catch(e) {
    console.error('Error server', e)
  }
}
