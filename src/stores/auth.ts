import type { LoginInterface, RegisterInterface } from '@/shared/interfaces';
import { authMiddleware, axiosEmailExists, axiosLogin, axiosRegister } from '@/shared/services/auth.service';
import { defineStore } from 'pinia'

const TOKEN_KEY = 'token';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY),
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY)
  }),
  actions: {
    async register(dataRegister: RegisterInterface) {
      try {
        const response = await axiosRegister(dataRegister);
        return response;
      } catch(e) {
        console.error('Erreur: inscription utilisateur', e);
      }
    },
    async login(dataLogin: LoginInterface) {
      try {
        const response = await axiosLogin(dataLogin);
        if (response && response.token) {
          localStorage.setItem(TOKEN_KEY, response.token);
          this.isLoggedIn = true;
          authMiddleware(TOKEN_KEY);
        } else {
          console.log('Erreur: token introuvable');
        }
      } catch(e) {
        console.error('Erreur: connexion utilisateur', e);
      }
    },
    async emailExists(dataLogin?: LoginInterface, dataRegister?: RegisterInterface) {
      try {
        const response = await axiosEmailExists(dataLogin, dataRegister);
        return response;
      } catch(e) {
        console.error('Erreur: récupération email utilisateur', e);
      }
    },
    logout(router: any) {
      this.isLoggedIn = false;
      this.token = '';
      localStorage.removeItem(TOKEN_KEY);
      router.push({path: '/login'});
    }
  }
})
