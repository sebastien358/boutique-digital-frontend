import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/admin/order'

export async function axiosGetAdminOrders(currentPage: number, itemPerPage: number) {
  try {
    const response = await axios.get(`${BASE_URL}/list`, {
      params: {
        page: currentPage,
        limit: itemPerPage
      }
    })
    return response.data
  } catch(e) {
    console.error('Error server', e)
    throw e
  }
}

export async function axiosAdminDeleteOrder(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`)
    if (response.status === 204 || response.status === 200) {
      return response
    } else {
      return false
    }
  } catch(e) {
    console.error('Error server', e)
  }
}
