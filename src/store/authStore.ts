import { User, AuthState, Order } from "@/types/product";

class AuthStore {
  private user: User | null = null;
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
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

  private loadFromStorage() {
    const savedUser = localStorage.getItem("optka-user");
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  private saveToStorage() {
    if (this.user) {
      localStorage.setItem("optka-user", JSON.stringify(this.user));
    } else {
      localStorage.removeItem("optka-user");
    }
  }

  login(email: string, password: string): boolean {
    // Простая проверка для демо (в реальном проекте - API)
    const users = this.getStoredUsers();
    const user = users.find((u) => u.email === email);

    if (user) {
      this.user = user;
      this.saveToStorage();
      this.notify();
      return true;
    }
    return false;
  }

  register(userData: Omit<User, "id">): boolean {
    const users = this.getStoredUsers();

    // Проверяем, не существует ли уже пользователь
    if (users.some((u) => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };

    users.push(newUser);
    localStorage.setItem("optka-users", JSON.stringify(users));

    this.user = newUser;
    this.saveToStorage();
    this.notify();
    return true;
  }

  logout() {
    this.user = null;
    this.saveToStorage();
    this.notify();
  }

  updateProfile(userData: Partial<User>): boolean {
    if (!this.user) return false;

    this.user = { ...this.user, ...userData };

    // Обновляем в общем списке пользователей
    const users = this.getStoredUsers();
    const userIndex = users.findIndex((u) => u.id === this.user!.id);
    if (userIndex !== -1) {
      users[userIndex] = this.user;
      localStorage.setItem("optka-users", JSON.stringify(users));
    }

    this.saveToStorage();
    this.notify();
    return true;
  }

  private getStoredUsers(): User[] {
    const stored = localStorage.getItem("optka-users");
    return stored ? JSON.parse(stored) : [];
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  getAuthState(): AuthState {
    return {
      user: this.user,
      isAuthenticated: this.isAuthenticated(),
    };
  }

  // Методы для работы с заказами
  saveOrder(orderData: Omit<Order, "id" | "userId">): Order {
    if (!this.user) throw new Error("Пользователь не авторизован");

    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      userId: this.user.id,
    };

    const orders = this.getStoredOrders();
    orders.push(order);
    localStorage.setItem("optka-orders", JSON.stringify(orders));

    return order;
  }

  getUserOrders(): Order[] {
    if (!this.user) return [];

    const orders = this.getStoredOrders();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    return orders
      .filter((order) => order.userId === this.user!.id)
      .filter((order) => new Date(order.orderDate) >= twoYearsAgo)
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
      );
  }

  private getStoredOrders(): Order[] {
    const stored = localStorage.getItem("optka-orders");
    return stored ? JSON.parse(stored) : [];
  }
}

export const authStore = new AuthStore();
