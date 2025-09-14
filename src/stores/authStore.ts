import type { LoginInterface, RegisterInterface } from '@/shared/interfaces';
import { authMiddleware, axiosEmailExists, axiosGetUserInfo, axiosLogin, axiosRegister } from '@/shared/services/auth.service';
import { defineStore } from 'pinia'

const TOKEN_KEY = 'token';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY),
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
    userRole: null,
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
        localStorage.setItem(TOKEN_KEY, response.token);
        this.isLoggedIn = true;
        await this.getUserInfo();
        authMiddleware(TOKEN_KEY);
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
    async getUserInfo() {
      try {
        const response = await axiosGetUserInfo()
        this.userRole = response.roles;
        console.log(this.userRole[0])
      } catch(e) {
        console.error('Erreur: récupération des informations de l\'utilisateur', e);
      }
    },
    logout(router: any) {
      this.isLoggedIn = false;
      this.token = null;
      localStorage.removeItem(TOKEN_KEY);
      router.push({path: '/login'});
    }
  }
})



