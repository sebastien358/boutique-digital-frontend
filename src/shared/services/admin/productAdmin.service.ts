import type { ProductFormInterface, ProductInterface } from '@/shared/interfaces';
import axios from 'axios';

export async function axiosAdminGetProducts(currentPage: number, itemsPerPage: number): Promise<ProductInterface[]> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/admin/products', {
      params: {
        page: currentPage,
        limit: itemsPerPage
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminGetCurrentProduct(id: number): Promise<any> {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/admin/product/${id}` );
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminDeleteProduct(id: number): Promise<any> {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/admin/product/delete/${id}` );
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminDeleteImage(productId: number, pictureId: number): Promise<any> {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/admin/product/${productId}/picture/${pictureId}`);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminProductNew(formData: ProductFormInterface): Promise<any> {
  try {
    const response = await axios.post('http://127.0.0.1:8000/admin/product/new', formData);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};