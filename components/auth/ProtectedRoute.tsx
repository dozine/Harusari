"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { checkAuth, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
