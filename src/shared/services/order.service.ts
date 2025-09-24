import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export async function axiosGetOrders(currentPage, itemPerPage) {
  try {
    const response = await axios.get(`${BASE_URL}/api/order/list`, {
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

export async function axiosAddOrder(dataCommand) {
  try {
    const response = await axios.post(`${BASE_URL}/api/order/new`, dataCommand)
    if (response.data.status >= 200 && response.data.status < 300) {
      return response.data
    } else {
      console.error('Error: la commande a échouée')
      return false
    }
  } catch(e) {
    console.error('Error: création d\'une commande', e)
    throw e
  }
}
