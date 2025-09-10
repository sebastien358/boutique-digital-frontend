export interface ProductBaseInterface {
  title: string
  description: string
  price: number
  pictures?: string[];
  category: {
    id: number,
    name: string
  }
}

export interface ProductInterface extends ProductBaseInterface {
  id: number
}

export interface ProductFormInterface extends ProductBaseInterface {
  // rien à ajouter ici
}