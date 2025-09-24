import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/admin'

export async function axiosGetAdminOrders(currentPage: number, itemPerPage: number) {
  try {
    const response = await axios.get(`${BASE_URL}/order/list`, {
      params: {
        page: currentPage,
        limit: itemPerPage
      }
    })
    return response.data
  } catch(e) {
    console.error('Error: récupération des commandes', e)
    throw e
  }
}

export async function axiosAdminDeleteOrder(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/order/delete/${id}`)
    if (response.status === 204 || response.status === 200) {
      return response
    } else {
      return false
    }
  } catch(e) {
    console.error('error: supression d\'un panier', e)
  }
}
