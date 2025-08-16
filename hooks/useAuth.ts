"use client";
import { useAuthStore } from "@/stores/authStore";
import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { User } from "@/stores/authStore";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setIsAuthenticated,
    setIsLoading,
    logout: logoutStore,
  } = useAuthStore();

  const router = useRouter();

  const login = useCallback(
    (userData: User) => {
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
    },
    [setUser, setIsAuthenticated, setIsLoading]
  );

  const logout = useCallback(async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logoutStore();
      router.push("/login");
    }
  }, [logoutStore, router]);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/auth/me");
      const userData = response.data.user;

      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      return userData;
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsAuthenticated, setIsLoading]);

  const clearAuth = useCallback(() => {
    logoutStore();
  }, [logoutStore]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
    clearAuth,
  };
};
