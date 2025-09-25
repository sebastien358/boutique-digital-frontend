import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/admin'

export async function axiosAdminGetCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return false
    }
  } catch(e) {
    console.error('Error server ', e);
  }
}
