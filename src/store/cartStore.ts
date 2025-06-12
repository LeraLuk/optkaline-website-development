import { Product, CartItem } from "@/types/product";
import { authStore } from "./authStore";

class CartStore {
  private userCarts: { [userId: string]: CartItem[] } = {};
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const saved = localStorage.getItem("optka-carts");
    if (saved) {
      this.userCarts = JSON.parse(saved);
    }
  }

  private saveToStorage() {
    localStorage.setItem("optka-carts", JSON.stringify(this.userCarts));
  }

  private getCurrentUserId(): string | null {
    const user = authStore.getUser();
    return user ? user.id : null;
  }

  private getCurrentUserItems(): CartItem[] {
    const userId = this.getCurrentUserId();
    if (!userId) return [];
    return this.userCarts[userId] || [];
  }

  private setCurrentUserItems(items: CartItem[]) {
    const userId = this.getCurrentUserId();
    if (!userId) return;

    this.userCarts[userId] = items;
    this.saveToStorage();
  }

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
    const items = this.getCurrentUserItems();
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.setCurrentUserItems(items);
    this.notify();
  }

  removeItem(productId: string) {
    const items = this.getCurrentUserItems();
    const filteredItems = items.filter((item) => item.product.id !== productId);
    this.setCurrentUserItems(filteredItems);
    this.notify();
  }

  updateQuantity(productId: string, quantity: number) {
    const items = this.getCurrentUserItems();
    const item = items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
        return;
      }
    }
    this.setCurrentUserItems(items);
    this.notify();
  }

  getItems(): CartItem[] {
    return [...this.getCurrentUserItems()];
  }

  getTotal(): number {
    return this.getCurrentUserItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  getItemCount(): number {
    return this.getCurrentUserItems().reduce(
      (count, item) => count + item.quantity,
      0,
    );
  }

  clear() {
    this.setCurrentUserItems([]);
    this.notify();
  }

  clearUserCart(userId: string) {
    delete this.userCarts[userId];
    this.saveToStorage();
    this.notify();
  }
}

export const cartStore = new CartStore();
