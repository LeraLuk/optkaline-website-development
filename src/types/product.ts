export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  gender: "мужские" | "женские" | "детские" | "унисекс";
  season: "весна-лето" | "осень-зима" | "всесезонные";
  type: "солнцезащитные" | "корригирующие" | "компьютерные" | "спортивные";
  image: string;
  description: string;
  inStock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface OrderData {
  customerName: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  items: CartItem[];
  total: number;
  orderDate: string;
}
