import axios from 'axios'

export async function axiosGetAdminOrders() {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/command/list')
    return response.data
  } catch(e) {
    console.error('Error: récupération des commandes', e)
    throw e
  }
}

