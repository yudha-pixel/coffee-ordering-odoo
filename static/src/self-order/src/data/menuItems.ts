// src/data/menuItems.ts
import { ProductProduct } from "../types";
import ImgCoffee from "../assets/Coffee.png";

export const menuItems: ProductProduct[] = [
  {
    id: "1",
    name: "Americano",
    description: "Strong coffee with hot water",
    basePrice: 25000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 },
      milk: { Regular: 0, 'Oat Milk': 5000, 'Almond Milk': 5000, 'Soy Milk': 3000 }
    },
    image: ImgCoffee,
    category: "Coffee",
    orderCount: 150,
    isRecommended: true,
    comboWith: ["8", "12"] // Affogato, Ristretto
  },
  {
    id: "2",
    name: "Latte",
    description: "Espresso with steamed milk and foam",
    basePrice: 30000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 },
      milk: { Regular: 0, 'Oat Milk': 5000, 'Almond Milk': 5000, 'Soy Milk': 3000 }
    },
    image: ImgCoffee,
    category: "Latte",
    orderCount: 200,
    isRecommended: true,
    comboWith: ["4", "5"] // Mocha, Flat White
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "Espresso topped with thick foam and steamed milk",
    basePrice: 32000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 },
      milk: { Regular: 0, 'Oat Milk': 5000, 'Almond Milk': 5000, 'Soy Milk': 3000 }
    },
    image: ImgCoffee,
    category: "Cappuccino",
    orderCount: 180,
    comboWith: ["2", "7"] // Latte, Macchiato
  },
  {
    id: "4",
    name: "Mocha",
    description: "Espresso with chocolate and steamed milk",
    basePrice: 35000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 },
      milk: { Regular: 0, 'Oat Milk': 5000, 'Almond Milk': 5000, 'Soy Milk': 3000 }
    },
    image: ImgCoffee,
    category: "Mocha",
    orderCount: 120,
    isNew: true,
    comboWith: ["2", "8"] // Latte, Affogato
  },
  {
    id: "5",
    name: "Flat White",
    description: "A velvety blend of espresso and microfoam",
    basePrice: 28000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 },
      milk: { Regular: 0, 'Oat Milk': 5000, 'Almond Milk': 5000, 'Soy Milk': 3000 }
    },
    image: ImgCoffee,
    category: "Coffee",
    orderCount: 90,
    isNew: true,
    comboWith: ["2", "3"] // Latte, Cappuccino
  },
  {
    id: "6",
    name: "Espresso",
    description: "Concentrated coffee brewed by forcing hot water",
    basePrice: 20000,
    variants: {
      sizes: { Small: -3000, Regular: 0, Large: 3000 }
    },
    image: ImgCoffee,
    category: "Coffee",
    orderCount: 160,
    comboWith: ["1", "12"] // Americano, Ristretto
  },
  {
    id: "7",
    name: "Macchiato",
    description: "Espresso with a dash of foamed milk",
    basePrice: 27000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 },
      milk: { Regular: 0, 'Oat Milk': 5000, 'Almond Milk': 5000, 'Soy Milk': 3000 }
    },
    image: ImgCoffee,
    category: "Coffee",
    orderCount: 100,
    isNew: true,
    comboWith: ["3", "6"] // Cappuccino, Espresso
  },
  {
    id: "8",
    name: "Affogato",
    description: "Vanilla ice cream topped with a shot of espresso",
    basePrice: 40000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 }
    },
    image: ImgCoffee,
    category: "Coffee",
    orderCount: 75,
    comboWith: ["4", "1"] // Mocha, Americano
  },
  {
    id: "9",
    name: "Irish Coffee",
    description: "Coffee with whiskey, sugar, and cream",
    basePrice: 45000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 8000 }
    },
    image: ImgCoffee,
    category: "Coffee",
    orderCount: 45
  },
  {
    id: "10",
    name: "Cold Brew",
    description: "Coffee brewed with cold water over 12 hours",
    basePrice: 30000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 }
    },
    image: ImgCoffee,
    category: "Cold Brew",
    orderCount: 110,
    isRecommended: true,
    comboWith: ["11"] // Nitro Coffee
  },
  {
    id: "11",
    name: "Nitro Coffee",
    description: "Cold brew infused with nitrogen for creaminess",
    basePrice: 38000,
    variants: {
      sizes: { Small: -5000, Regular: 0, Large: 5000 }
    },
    image: ImgCoffee,
    category: "Cold Brew",
    orderCount: 85,
    isNew: true,
    comboWith: ["10"] // Cold Brew
  },
  {
    id: "12",
    name: "Ristretto",
    description: "A short shot of espresso with a rich flavor",
    basePrice: 22000,
    variants: {
      sizes: { Small: -3000, Regular: 0, Large: 3000 }
    },
    image: ImgCoffee,
    category: "Coffee",
    orderCount: 95,
    comboWith: ["1", "6"] // Americano, Espresso
  }
];