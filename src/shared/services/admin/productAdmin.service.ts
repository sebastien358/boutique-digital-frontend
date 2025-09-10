import type { ProductFormInterface } from '@/shared/interfaces';
import axios from 'axios';

export async function axiosAdminProductNew(formData: ProductFormInterface) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/admin/product/new', formData);
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};