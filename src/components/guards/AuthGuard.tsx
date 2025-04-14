// src/components/guards/AuthGuard.tsx
"use client";

import { useSession } from "@/modules/auth/hooks/useSession";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null; // bisa ganti dengan spinner

  return <>{children}</>;
}
