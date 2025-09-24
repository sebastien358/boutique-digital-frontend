import { defineStore } from 'pinia'
import { axiosAddOrder, axiosGetOrders } from '@/shared/services/order.service.ts'

export const useCommandStore = defineStore('order', {
  state: () => ({
    order: [],
    totalOrders: 0
  }),
  actions: {
    async getOrders(currentPage: number, itemPerPage: number) {
      try {
        const response = await axiosGetOrders(currentPage, itemPerPage)
        if (response) {
          this.order = Array.isArray(response.orders) ? response.orders : [response.orders]
          this.totalOrders = response.total
        } else {
          console.error('La response est vide')
        }
      } catch(e) {
        console.error('Error: récupération des commandes', e)
      }
    },
    async addCommand(dataCommand) {
      try {
        return await axiosAddOrder(dataCommand)
      } catch(e) {
        console.error('Error: la commande a échouée', e)
      }
    }
  }
})
