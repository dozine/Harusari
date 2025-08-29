"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

interface AuthProviderWrapperProps {
  children: React.ReactNode;
}

function AuthProviderWrapper({ children }: AuthProviderWrapperProps) {
  const { checkAuth, isLoading } = useAuth();
  const [authCheckedOnLoad, setAuthCheckedOnLoad] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const publicPaths = ["/login", "/signup"];
    if (publicPaths.includes(pathname)) {
      console.log(
        "AppProvider: Public path detected, skipping initial auth check."
      );
      setAuthCheckedOnLoad(true);
      return;
    }

    if (!authCheckedOnLoad && !isLoading) {
      console.log(
        "AppProvider: Protected path, performing initial auth check..."
      );
      const performAuthCheck = async () => {
        await checkAuth();
        setAuthCheckedOnLoad(true);
        console.log("AppProvider: Initial auth check completed.");
      };
      performAuthCheck();
    }
  }, [checkAuth, authCheckedOnLoad, pathname, isLoading]);

  return <>{children}</>;
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProviderWrapper>{children}</AuthProviderWrapper>
    </QueryClientProvider>
  );
}
