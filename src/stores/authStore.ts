import type { LoginInterface, RegisterInterface } from '@/shared/interfaces';
import { authMiddleware, axiosEmailExists, axiosGetUserInfo, axiosLogin, axiosRegister } from '@/shared/services/auth.service';
import { defineStore } from 'pinia'

const TOKEN_KEY = 'token'
const USER_ROLE = 'userRole'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY),
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
    userRole: JSON.stringify(localStorage.getItem(USER_ROLE)) || []
  }),
  actions: {
    async register(dataRegister: RegisterInterface) {
      try {
        return await axiosRegister(dataRegister);
      } catch(e) {
        console.error('Erreur: inscription utilisateur', e);
      }
    },
    async login(dataLogin: LoginInterface) {
      try {
        const response = await axiosLogin(dataLogin);
        localStorage.setItem(TOKEN_KEY, response.token);
        console.log(response)
        this.isLoggedIn = true
        authMiddleware(TOKEN_KEY)
        await this.userGetInfo()
      } catch(e) {
        console.error('Erreur: connexion utilisateur', e);
      }
    },
    async emailExists(dataLogin?: LoginInterface, dataRegister?: RegisterInterface) {
      try {
        return await axiosEmailExists(dataLogin, dataRegister);
      } catch(e) {
        console.error('Erreur: récupération email utilisateur', e);
      }
    },
    async userGetInfo() {
      try {
        const response = await axiosGetUserInfo()
        localStorage.setItem(USER_ROLE, JSON.stringify(response.roles));
        this.userRole = response.roles;
        console.log(response)
      } catch(e) {
        console.error('Erreur: récupérarion utilisateur', e)
      }
    },
    roleAdmin(): boolean {
      return this.userRole !== null && this.userRole.includes('ROLE_ADMIN')
    },
    roleUser() {
      return this.userRole !== null && this.userRole.includes('ROLE_USER')
    },
    logout(router: any) {
      this.isLoggedIn = false
      this.token = null
      this.userRole = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_ROLE)
      router.push({ path: '/login' })
    }
  }
})



