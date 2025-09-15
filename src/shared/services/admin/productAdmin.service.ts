import type { ProductFormInterface } from '@/shared/interfaces';
import axios from 'axios';

export async function axiosAdminGetProducts(currentPage: number, itemsPerPage: number) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/products', {
      params: {
        page: currentPage,
        limit: itemsPerPage
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e.response);
    console.error('Status: ', e.response.status);
    console.error('Data: ', e.response.data);
  }
};

export async function axiosAdminGetCurrentProduct(id: number) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/admin/product/${id}` );
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminDeleteProduct(id: number) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/admin/product/delete/${id}` );
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminDeleteImage(productId: number, pictureId: number) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/admin/product/${productId}/picture/${pictureId}`);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminProductNew(formData: ProductFormInterface) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/admin/product/new', formData);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};

export async function axiosAdminProductEdit(formData: ProductFormInterface, id: number) {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/admin/product/edit/${id}`, formData);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};
