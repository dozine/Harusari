"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ProvidersProps {
  children: React.ReactNode;
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { checkAuth, isLoading } = useAuth();
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setHasInitialized(true);
    };
    initAuth();
  }, [checkAuth]);
  if (!hasInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }
}

export function Provider({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>{children}</AuthInitializer>
    </QueryClientProvider>
  );
}
