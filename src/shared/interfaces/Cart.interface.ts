export interface ProductCartInterface {
  id: number  
  title: string
  price: number
  quantity: number
}

export interface ProductCartFormInterface extends ProductCartInterface {
  // rien à ajouter ici
}