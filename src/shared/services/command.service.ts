import axios from 'axios'

export async function axiosAddCommand(dataCommand) {
  try {
    const response = await axios.post('http://localhost:8000/api/command/new', dataCommand)
    if (response.data.status >= 200 && response.data.status < 300) {
      return response.data
    } else {
      console.error('la commande a échouée')
      return null
    }
  } catch(e) {
    console.error('Erreur lors de la création de la commande', e)
    throw e
  }
}
