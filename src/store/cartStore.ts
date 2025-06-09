import { Product, CartItem } from "@/types/product";

class CartStore {
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  addItem(product: Product, quantity: number = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    this.notify();
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.notify();
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
      }
    }
    this.notify();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.notify();
  }
}

export const cartStore = new CartStore();
