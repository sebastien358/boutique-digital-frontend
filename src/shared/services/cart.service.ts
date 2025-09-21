import axios from 'axios';
import type { ProductCartInterface } from '@/shared/interfaces'

export async function axiosAddToCart(productToCart: any[]): Promise<any> {
  try {
    const response = await axios.post('http://localhost:8000/api/item/new', productToCart)
    if (response.data.status > 200 && response.data.status < 300) {
      return response.data
    } else {
      return null
    }
  } catch(e) {
    console.error('Error: récupération des produits', e)
    throw e
  }
}

export async function axiosGetCartItems(): Promise<ProductCartInterface[]> {
  try {
    const response = await axios.get('http://localhost:8000/api/item/list')
    return response.data
  } catch(e) {
    console.error('Error: Ajout d\'un produit au panier', e)
    throw e
  }
}

export async function axiosRemoveFromCart(id: number): Promise<ProductCartInterface[]> {
  try {
    const response = await axios.delete(`http://localhost:8000/api/item/delete/${id}`)
    return response.data
  } catch(e) {
    console.error('Error: suppression d\'un produit du panier', e)
    throw e
  }
}

export async function axiosAddProductFromCartExisting(id: number) {
  try {
    const response = await axios.post(`http://localhost:8000/api/item/add/${id}`)
    return response.data
  } catch(e) {
    console.error('Error: ajout d\'un produit au panier', e)
  }
}
