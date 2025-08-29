"use client";
import { useAuthStore } from "@/stores/authStore";
import { use, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { User } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const {
    setUser,
    setIsAuthenticated,
    setIsLoading,
    logout: logoutStore,
  } = useAuthStore();

  const router = useRouter();
  const queryClient = useQueryClient();

  const authQuery = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/auth/me");
        const userData = response.data.user;
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setIsAuthenticated(false);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post("/api/auth/login", credentials);
      const userData = response.data.user;
      return userData;
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(["me"], userData);
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      router.push("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/auth/logout");
    },
    onSuccess: () => {
      logoutStore();
      queryClient.removeQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.error("logout error", error);
    },
  });

  const checkAuth = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["me"] });
  }, [queryClient]);

  const clearAuth = useCallback(() => {
    logoutStore();
    queryClient.removeQueries({ queryKey: ["me"] });
  }, [logoutStore, queryClient]);

  return {
    user: authQuery.data,
    isAuthenticated: authQuery.data !== null,
    isLoading: authQuery.isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    checkAuth,
    clearAuth,
  };
};
