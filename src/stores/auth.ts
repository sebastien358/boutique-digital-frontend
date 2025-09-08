import { authMiddleware, axiosEmailExists, axiosLogin, axiosRegister } from '@/shared/services/auth.service';
import { defineStore } from 'pinia'

const TOKEN_KEY = 'token';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY),
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY)
  }),
  actions: {
    async register(dataRegister) {
      try {
        const response = await axiosRegister(dataRegister);
        return response;
      } catch(e) {
        console.error('Erreur: inscription utilisateur', e);
      }
    },
    async login(dataLogin) {
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
    async emailExists(dataLogin) {
      try {
        const response = await axiosEmailExists(dataLogin);
        return response;
      } catch(e) {
        console.error('Erreur: récupération email utilisateur', e);
      }
    },
    logout(router) {
      this.isLoggedIn = false;
      this.token = null;
      localStorage.removeItem(TOKEN_KEY);
      router.push({path: '/login'});
    }
  }
})
