export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  gender: "мужские" | "женские" | "детские" | "унисекс";
  season: "весна-лето" | "осень-зима" | "всесезонные";
  type: "солнцезащитные" | "медицинская оптика";
  image: string;
  description: string;
  inStock: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  company: string;
  phone: string;
  address: string;
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

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  items: CartItem[];
  total: number;
  orderDate: string;
  status: OrderStatus;
  telegramSent: boolean;
}

export interface OrderItem extends CartItem {
  orderId: string;
}
