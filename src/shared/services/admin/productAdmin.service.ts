import type { ProductFormInterface } from '@/shared/interfaces';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/admin'

export async function axiosAdminGetProducts(currentPage: number, itemsPerPage: number) {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {
        page: currentPage,
        limit: itemsPerPage
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

export async function axiosAdminGetCurrentProduct(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/product/${id}` );
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

export async function axiosAdminDeleteProduct(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/product/delete/${id}` );
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

export async function axiosAdminDeleteImage(productId: number, pictureId: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${productId}/picture/${pictureId}`);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

export async function axiosAdminProductNew(formData: ProductFormInterface) {
  try {
    const response = await axios.post(`${BASE_URL}/product/new`, formData);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}

export async function axiosAdminProductEdit(formData: ProductFormInterface, id: number) {
  try {
    const response = await axios.post(`${BASE_URL}/product/edit/${id}`, formData);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
}
