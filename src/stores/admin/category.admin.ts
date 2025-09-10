import type { CategoryInterface } from "@/shared/interfaces";
import { axiosAdminGetCategories } from "@/shared/services/admin/categoryAdmin.service";
import { defineStore } from "pinia";

interface CategoryState {
  category: CategoryInterface[]
}

export const useAdminCategory = defineStore('category', {
  state: (): CategoryState => ({
    category: []
  }),
  actions: {
    async getCategories(append = false) {
      try {
        const response = await axiosAdminGetCategories();
        const categories: CategoryInterface[] = Array.isArray(response) ? response : [response];
        this.category = append ? [...this.category, ...categories] : categories;
      } catch(e) {
        console.error('Erreur: récupération de la liste des catégories', e);
      }
    }
  }
})