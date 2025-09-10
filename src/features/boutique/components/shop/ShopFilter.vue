<template>
  <div class="d-flex flex-column space-between shop-filter">

    <div class="d-flex flex-column"> 
      <div class="d-flex flex-column shop-filter_search">
        <h3>Rechercher</h3>
        <input @input="inputSearchTerm()" v-model="productStore.searchTerm" type="text" placeholder="Rechercher" />
      </div>
      <div class="d-flex flex-column shop-filter_price">
        <h3>Filtrer par prix</h3>
        <div v-for="(priceRange, index) in [[0, 4000], [500, 1000], [1000, 1500], [1500, 2000], [2000, 4000]]" :key="index" class="mb-10">
          <input 
            @click="filteredByPrice(priceRange)"
            :checked="productStore.priceRange[0] === priceRange[0]"
            name="priceRange" 
            type="radio" 
          />
          <span>
            {{ 
              priceRange[0] === 0 ? 
              'Tous les produits' : priceRange[0] === 2000 ? 
              'Plus de 2000' : `Entre ${priceRange[0]} et ${priceRange[1]}`  
            }}
          </span>
        </div>
      </div>
      <div class="d-flex flex-column shop-filter_category">
        <h3>Filtrer par catégories</h3>
        <div v-for="(category, index) in ['all', 'streaming', 'gamer', 'desktop']" :key="index" class="mb-15">
          <span @click="filteredByCategory(category)" :class="{'active-category': productStore.category.includes(category)}">
            {{ category }}
          </span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column shop-filter_reinitialisation">
      <p>Nombre de produits : <span>{{ products.length }}</span></p>
      <button @click="productStore.initProductFilters()" class="btn btn-danger">Réinitialisation</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import type { ProductInterface }from '@/shared/interfaces'

defineProps<{
  products: ProductInterface[]
}>()

const productStore = useProductStore();

async function inputSearchTerm() {
  try {
    await productStore.searchProducts(productStore.searchTerm);
  } catch(e) {
    console.error(e);
  }
}

async function filteredByPrice(priceRange: number[]) {
    try {
    await productStore.filteredProductByPrice(priceRange);
  } catch(e) {
    console.error(e);
  }
}

async function filteredByCategory(category: string) {
  try {
    await productStore.filteredProductByCategory(category);
    productStore.category = category;
  } catch(e) {
    console.error(e);
  }
}
</script>

<style scoped lang="scss">
.shop-filter {
  border-right: var(--border);
  &_search {
    margin-bottom: 20px;
    input {
      border: 0;
      border: var(--border);
      border-radius: var(--border-radius);
      padding: 10px;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  &_price {
    margin-bottom: 15px;
    h3 {
      font-size: 15px;
      margin-bottom: 10px;
    }
    input {
      margin-right: 3px;
    }
    span {
      font-size: 14px;
    }
  }
  &_category {
    h3 {
      font-size: 15px;
      margin-bottom: 10px;
    }
    span {
      cursor: pointer;
      font-size: 15px;
    }
    .active-category {
      color: #008000;
    }
  }
  &_reinitialisation {
    p {
      margin-bottom: 3px;
      font-size: 13px;
    }
    p > span {
      color: var(--green-validate-form);
    }
  }
}
</style>
