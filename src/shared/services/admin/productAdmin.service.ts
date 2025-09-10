import type { ProductFormInterface, ProductInterface } from '@/shared/interfaces';
import axios from 'axios';

export async function axiosAdminGetProducts(): Promise<ProductInterface[]> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/admin/products');
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