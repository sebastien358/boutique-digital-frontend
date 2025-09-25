import axios from 'axios';
import { useAuthStore } from '@/stores/authStore.ts'
import type { LoginInterface, RegisterInterface } from '../interfaces';

const BASE_URL = 'http://127.0.0.1:8000/api'

export async function axiosRegister(dataRegister: RegisterInterface): Promise<RegisterInterface> {
  try {
    const response = await axios.post(`${BASE_URL}/register`, dataRegister);
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      return false
    }
  } catch(e) {
    console.log('Error server', e);
    throw e;
  }
}

export async function axiosLogin(dataLogin: LoginInterface): Promise<LoginInterface> {
  try {
    const { email, password } = dataLogin;
    const response = await axios.post(`${BASE_URL}/login_check`, {
      username: email,
      password
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return false
    }
  } catch(e) {
    console.log('Error server', e);
    throw e;
  }
}

export async function axiosEmailExists(dataLogin?: LoginInterface, dataRegister?: RegisterInterface): Promise<any> {
  try {
    if (dataLogin) {
      const { email } = dataLogin;
      const response = await axios.post(`${BASE_URL}/user/email-exists`, {
        email
      });
      return response.data;
    }
    if (dataRegister) {
      const { email } = dataRegister;
      const response = await axios.post(`${BASE_URL}/email-exists`, {
        email
      });
      return response.data;
    }
  } catch(e) {
    console.log('Error server', e);
    throw e;
  }
}

export async function axiosGetUserInfo() {
  try {
    const response = await axios.get(`${BASE_URL}/user/me`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      return false
    }
  } catch(e) {
    console.error('Error server', e)
  }
}

export const authMiddleware = (config) => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

axios.interceptors.request.use(authMiddleware)
