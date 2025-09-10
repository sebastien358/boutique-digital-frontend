import axios from 'axios';

export async function axiosAdminGetCategories() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/admin/categories');
    return response.data;
  } catch(e) {
    console.error('Erreur: ', e);
  }
};