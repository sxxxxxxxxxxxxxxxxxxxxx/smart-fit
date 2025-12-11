export type OutfitItem = {
  id: string
  name: string
  price: number
  imageUrl: string
}

export type Outfit = {
  mainImage: string
  items: OutfitItem[]
}

export const mockOutfit: Outfit = {
  mainImage: "/models/model-01.svg",
  items: [
    { id: "hat", name: "帽子", price: 120, imageUrl: "/items/hat.svg" },
    { id: "top", name: "上衣", price: 380, imageUrl: "/items/top.svg" },
    { id: "pants", name: "裤装", price: 450, imageUrl: "/items/pants.svg" },
  ],
}