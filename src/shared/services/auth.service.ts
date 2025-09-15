import axios from 'axios';

import type { LoginInterface, RegisterInterface } from '../interfaces';

export async function axiosRegister(dataRegister: RegisterInterface): Promise<RegisterInterface> {
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

export async function axiosLogin(dataLogin: LoginInterface): Promise<LoginInterface> {
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

export async function axiosEmailExists(dataLogin?: LoginInterface, dataRegister?: RegisterInterface): Promise<any> {
  try {
    if (dataLogin) {
      const { email } = dataLogin;
      const response = await axios.post('http://127.0.0.1:8000/api/user/email-exists', {
        email
      });
      return response.data;
    }
    if (dataRegister) {
      const { email } = dataRegister;
      const response = await axios.post('http://127.0.0.1:8000/api/email-exists', {
        email
      });
      return response.data;
    }
  } catch(e) {
    console.log('Erreur: ', e);
    throw e;
  }
}

export async function axiosGetUserInfo() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/me')
    return response.data
  } catch(e) {
    console.error('Erreur: ', e)
  }
}

export const authMiddleware = (TOKEN_KEY: string) => (config: any) => {
  const token: string | null = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

axios.interceptors.request.use(authMiddleware('token'));
