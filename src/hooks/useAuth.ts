import { useState, useEffect } from "react";
import { authStore } from "@/store/authStore";
import { telegramService } from "@/services/telegramService";
import {
  User,
  AuthState,
  LoginFormData,
  RegisterFormData,
} from "@/types/product";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(
    authStore.getAuthState(),
  );

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setAuthState(authStore.getAuthState());
    });

    return unsubscribe;
  }, []);

  const login = (data: LoginFormData): boolean => {
    return authStore.login(data.email, data.password);
  };

  const register = (data: RegisterFormData): boolean => {
    const success = authStore.register({
      email: data.email,
      name: data.name,
      company: data.company,
      phone: data.phone,
      address: data.address,
    });

    if (success) {
      // Отправляем уведомление в Telegram
      telegramService
        .sendUserRegistration({
          name: data.name,
          company: data.company,
          phone: data.phone,
        })
        .catch((error) => {
          console.error("Ошибка отправки уведомления о регистрации:", error);
        });
    }

    return success;
  };

  const logout = () => {
    authStore.logout();
  };

  const updateProfile = (userData: Partial<User>): boolean => {
    return authStore.updateProfile(userData);
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
  };
}
