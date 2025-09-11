import type { ProductInterface } from '@/shared/interfaces'
import {
  axiosFilteredProductByCategory,
  axiosFilteredProductByPrice,
  axiosGetProducts,
  axiosSearchProducts,
} from '@/shared/services/product.service'
import { defineStore } from 'pinia'

interface ProductState {
  products: ProductInterface[]
  searchTerm: string
  priceRange: [number, number]
  category: string
  offset: number
  limit: number
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    searchTerm: '',
    priceRange: [0, 4000],
    category: 'all',
    offset: 0,
    limit: 20,
  }),
  actions: {
    async getProducts(append = false) {
      try {
        const response = await axiosGetProducts(this.offset, this.limit);
        if (response) {
          const products: ProductInterface[] = Array.isArray(response) ? response : [response];
          this.products = append ? [...this.products, ...products] : products;
        } else {
          console.log('Erreur: response vide');
        }
      } catch (e) {
        console.error('Erreur: récupération des produits', e)
      }
    },
    async loadProducts() {
      try {
        this.offset += this.limit;
        await this.getProducts(true);
        return true
      } catch (e) {
        console.error('Erreur: button load products', e)
      }
    },
    async searchProducts(search: string) {
      try {
        this.searchTerm = search.trim();
        const response = await axiosSearchProducts(this.searchTerm);
        this.products = response;
      } catch (e) {
        console.error('Erreur: search products', e)
      }
    },
    async filteredProductByPrice(priceRange: number[]) {
      try {
        const [minPrice, maxPrice] = priceRange
        const response = await axiosFilteredProductByPrice(minPrice, maxPrice);
        this.products = response;
      } catch (e) {
        console.error('Erreur: filtration par prix', e);
      }
    },
    async filteredProductByCategory(category: string) {
      try {
        const response = await axiosFilteredProductByCategory(category);
        switch (category) {
          case 'all':
            await this.getProducts()
            break
          case 'desktop':
          case 'gamer':
          case 'streaming':
            this.products = response
            break
          default:
            this.products = []
            break
        }
      } catch (e) {
        console.error('Erreur: filtration par catégories', e);
      }
    },
    async initProductFilters() {
      this.products = [];
      this.searchTerm = '';
      this.priceRange = [0, 4000];
      this.category = 'all';
      this.offset = 0;
      this.limit = 20;
      await this.getProducts();
    }
  }
})
