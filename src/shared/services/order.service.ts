import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/order'

export async function axiosGetOrders(currentPage: number, itemPerPage: number) {
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

export async function axiosAddOrder(dataCommand) {
  try {
    const response = await axios.post(`${BASE_URL}/new`, dataCommand)
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      console.error('Error server')
      return false
    }
  } catch(e) {
    console.error('Error server', e)
    throw e
  }
}
