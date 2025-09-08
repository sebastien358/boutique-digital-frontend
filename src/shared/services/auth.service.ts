import axios from 'axios';

export async function axiosRegister(dataRegister): Promise<any> {
  try {
    const { lastname, firstname, email, password } = dataRegister;
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      lastname, 
      firstname, 
      email, 
      password
    });
    return response.data;
  } catch(e) {
    console.log('Erreur: ', e);
    throw e;
  }
}

export async function axiosLogin(dataLogin): Promise<any> {
  try {
    const { email, password } = dataLogin;
    const response = await axios.post('http://127.0.0.1:8000/api/login_check', {
      username: email,
      password
    });
    return response.data;
  } catch(e) {
    console.log('Erreur: ', e);
    throw e;
  }
}

export async function axiosEmailExists(dataLogin): Promise<any> {
  try {
    const { email } = dataLogin;
    const response = await axios.post('http://127.0.0.1:8000/api/email-exists', {
      email
    });
    return response.data;
  } catch(e) {
    console.log('Erreur: ', e);
    throw e;
  }
}

export const authMiddleware = (TOKEN_KEY: string) => (config: any) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('TOKEN_KEY', token);
  return config;
}

axios.interceptors.request.use(authMiddleware('token'));
