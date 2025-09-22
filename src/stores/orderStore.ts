import { defineStore } from 'pinia'
import { axiosAddCommand } from '@/shared/services/order.service.ts'

export const useCommandStore = defineStore('command', {
  state: () => ({
  }),
  actions: {
    async addCommand(dataCommand) {
      try {
        await axiosAddCommand(dataCommand)
      } catch(e) {
        console.error('Error: la commande a échouée', e)
      }
    }
  }
})
