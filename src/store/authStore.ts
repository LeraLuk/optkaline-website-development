import { User, AuthState, Order } from "@/types/product";

class AuthStore {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
  };

  private orders: Order[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const savedAuth = localStorage.getItem("optka-auth");
    const savedOrders = localStorage.getItem("optka-orders");

    if (savedAuth) {
      this.state = JSON.parse(savedAuth);
    }

    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }

  private saveToStorage() {
    localStorage.setItem("optka-auth", JSON.stringify(this.state));
    localStorage.setItem("optka-orders", JSON.stringify(this.orders));
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  login(email: string, password: string): boolean {
    // Простая проверка для демо
    if (email && password) {
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
        company: "",
        phone: "",
        address: "",
      };

      this.state = {
        user,
        isAuthenticated: true,
      };
      this.saveToStorage();
      this.notify();
      return true;
    }
    return false;
  }

  register(userData: {
    email: string;
    name: string;
    company: string;
    phone: string;
    address: string;
  }): boolean {
    const user: User = {
      id: `user_${Date.now()}`,
      email: userData.email,
      name: userData.name,
      company: userData.company,
      phone: userData.phone,
      address: userData.address,
    };

    this.state = {
      user,
      isAuthenticated: true,
    };
    this.saveToStorage();
    this.notify();
    return true;
  }

  updateProfile(userData: Partial<User>): boolean {
    if (!this.state.user) return false;

    this.state.user = { ...this.state.user, ...userData };
    this.saveToStorage();
    this.notify();
    return true;
  }

  logout() {
    this.state = {
      user: null,
      isAuthenticated: false,
    };
    this.saveToStorage();
    this.notify();
  }

  getUser(): User | null {
    return this.state.user;
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  getAuthState(): AuthState {
    return { ...this.state };
  }

  saveOrder(orderData: any) {
    if (!this.state.user) return;

    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: this.state.user.id,
      customerName: orderData.customerName,
      company: orderData.company,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      items: orderData.items,
      total: orderData.total,
      orderDate: orderData.orderDate,
      status: orderData.status || "pending",
      telegramSent: orderData.telegramSent || false,
    };

    this.orders.push(order);
    this.saveToStorage();
    this.notify();
  }

  getUserOrders(): Order[] {
    if (!this.state.user) return [];
    return this.orders.filter((order) => order.userId === this.state.user!.id);
  }

  getAllOrders(): Order[] {
    return [...this.orders];
  }
}

export const authStore = new AuthStore();
