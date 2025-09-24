import axios from 'axios';

export async function axiosAdminGetCategories() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/categories');
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return false
    }
  } catch(e) {
    console.error('Error: ', e);
  }
}
