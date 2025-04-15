// src/components/guards/PublicGuard.tsx
"use client";

import { useSession } from "@/modules/auth/hooks/useSession";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type PublicGuardProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function PublicGuard({ children, redirectTo = "/dashboard" }: PublicGuardProps) {
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
