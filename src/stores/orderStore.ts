import { defineStore } from 'pinia'
import { axiosAddOrder } from '@/shared/services/order.service.ts'

export const useCommandStore = defineStore('command', {
  state: () => ({
    order: []
  }),
  actions: {
    async addCommand(dataCommand) {
      try {
        const response = await axiosAddOrder(dataCommand)
        return response
      } catch(e) {
        console.error('Error: la commande a échouée', e)
      }
    }
  }
})
