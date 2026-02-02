import { useState, useEffect, useCallback } from "react";

interface User {
  email: string;
  name: string;
  role: "admin" | "vendedor";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Credenciais mockadas
const MOCK_USERS = [
  { email: "admin@zapsolar.com", password: "admin123", name: "Administrador", role: "admin" as const },
  { email: "vendedor@zapsolar.com", password: "vendas123", name: "João Vendas", role: "vendedor" as const },
];

const AUTH_STORAGE_KEY = "zap_solar_auth";

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);

    if (user) {
      const userData: User = { email: user.email, name: user.name, role: user.role };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      setAuthState({ user: userData, isAuthenticated: true, isLoading: false });
      return { success: true };
    }

    return { success: false, error: "E-mail ou senha incorretos" };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
};
