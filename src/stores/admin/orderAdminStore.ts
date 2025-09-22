import { defineStore } from 'pinia'
import { axiosAdminDeleteOrder, axiosGetAdminOrders } from '@/shared/services/admin/orderAdmin.service.ts'

export const useOrderAdminStore = defineStore('orderAdmin', {
  state: () => ({
    order: [],
    totalOrders: 0
  }),
  actions: {
    async getOrders(currentPage: number, itemPerPage: number) {
      try {
        const response = await axiosGetAdminOrders(currentPage, itemPerPage);
        if (response.orders) {
          const orders = Array.isArray(response.orders) ? response.orders : [response.orders]
          this.order = orders
          this.totalOrders = response.total
        } else {
          console.error('La response est vide')
        }
      } catch(e) {
        console.error('Erreur: récupération des commandes', e)
      }
    },
    async deleteOrder(id: number) {
      try {
        const response = await axiosAdminDeleteOrder(id)
        if (response) {
          await this.getOrders()
        }
      } catch(e) {
        console.error('Error: suppression d\'un panier', e)
      }
    }
  }
})
