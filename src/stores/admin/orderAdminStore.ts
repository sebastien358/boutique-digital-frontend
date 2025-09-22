import { defineStore } from 'pinia'
import { axiosGetAdminOrders } from '@/shared/services/admin/orderAdmin.service.ts'


export const useOrderAdminStore = defineStore('orderAdmin', {
  state: () => ({
    order: []
  }),
  actions: {
    async getOrders() {
      try {
        const response = await axiosGetAdminOrders();
        const order = Array.isArray(response) ? response : [response]
        this.order = order
      } catch(e) {
        console.error('Erreur: récupération des commandes', e)
      }
    }
  }
})
