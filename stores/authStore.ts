import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user }, false, "setUser"),
      setIsAuthenticated: (isAuthenticated) =>
        set({ isAuthenticated }, false, "setIsAuthenticated"),
      setIsLoading: (isLoading) => set({ isLoading }, false, "setIsLoading"),
      logout: () =>
        set(
          {
            user: null,
            isAuthenticated: false,
          },
          false,
          "logout"
        ),
    }),
    {
      name: "auth-store", // Redux DevTools에서 보이는 이름
    }
  )
);
