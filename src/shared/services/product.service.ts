import axios from 'axios';

export async function axiosGetProducts(offset: number, limit: number) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/products', {
      params: {
        offset,
        limit
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur: ', e);
  }
}

export async function axiosSearchProducts(search: string) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/products/search', {
      params: {
        search
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur: ', e);
  }
}

export async function axiosFilteredProductByPrice(minPrice: number, maxPrice: number) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/products/filtered/price', {
      params: {
        minPrice,
        maxPrice
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur: ', e);
  }
}

export async function axiosFilteredProductByCategory(category: string) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/products/filtered/category', {
      params: {
        category
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur: ', e);
  }
}