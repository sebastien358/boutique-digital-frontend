import type { CategoryInterface } from "@/shared/interfaces";
import { axiosAdminGetCategories } from "@/shared/services/admin/categoryAdmin.service";
import { defineStore } from "pinia";

interface CategoryState {
  category: CategoryInterface[]
}

export const useAdminCategory = defineStore('categoryAdmin', {
  state: (): CategoryState => ({
    category: []
  }),
  actions: {
    async getCategories() {
      try {
        const response = await axiosAdminGetCategories();
        switch(response) {
          case response:
          case Array.isArray(response):
            this.category = response;
            break;
          case !Array.isArray(response):
            this.category = [response];
          default:
            console.log('Liste des catégories introuvables');
            break;
        }
      } catch(e) {
        console.error('Erreur: récupération de la liste des catégories', e);
      }
    }
  }
})