import axios from 'axios'

export async function axiosAddCommand(dataCommand) {
  try {
    const response = await axios.post('http://localhost:8000/api/command/new', dataCommand)
    return response.data
  } catch(e) {
    console.error('Error', e)
  }
}
