import type { LoginInterface, RegisterInterface } from '@/shared/interfaces';
import { axiosEmailExists, axiosGetUserInfo, axiosLogin, axiosRegister } from '@/shared/services/auth.service';
import { defineStore } from 'pinia'

const TOKEN_KEY = 'token'
const USER_ROLE = 'userRole'
const ROLE_ADMIN = 'ROLE_ADMIN'
const ROLE_USER = 'ROLE_USER'

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
        console.error('Error: inscription', e);
      }
    },
    async login(dataLogin: LoginInterface) {
      try {
        const response = await axiosLogin(dataLogin);
        localStorage.setItem(TOKEN_KEY, response.token);
        this.token = response.token
        this.isLoggedIn = true
        await this.userGetInfo();
        console.log(response)
      } catch(e) {
        console.error('Error: connexion', e);
      }
    },
    async emailExists(dataLogin?: LoginInterface, dataRegister?: RegisterInterface) {
      try {
        return await axiosEmailExists(dataLogin, dataRegister);
      } catch(e) {
        console.error('Error: email existing', e);
      }
    },
    async userGetInfo() {
      try {
        const response = await axiosGetUserInfo()
        localStorage.setItem(USER_ROLE, JSON.stringify(response.roles));
        this.userRole = response.roles;
        console.log(response)
      } catch(e) {
        console.error('Error: information user', e)
      }
    },
    roleAdmin(): boolean {
      return this.userRole !== null && this.userRole.includes(ROLE_ADMIN)
    },
    roleUser() {
      return this.userRole !== null && this.userRole.includes(ROLE_USER)
    },
    logout() {
      this.token = null
      this.isLoggedIn = false
      this.userRole = []
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_ROLE)
    }
  }
})



