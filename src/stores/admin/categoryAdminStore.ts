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
        if (response) {
          const categories: CategoryInterface[] = Array.isArray(response) ? response : [response]
          this.category = categories
        } else {
          console.log('Erreur: response vide');
        }
      } catch(e) {
        console.error('Erreur: récupération de la liste des catégories', e);
      }
    }
  }
})