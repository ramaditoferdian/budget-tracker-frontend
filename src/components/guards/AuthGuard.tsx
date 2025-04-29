// src/components/guards/AuthGuard.tsx
'use client';

import { useSession } from '@/modules/auth/hooks/useSession';
import React, { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Loading from '../Loading';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <Loading />;
  } else {
    if (!user) {
      redirect('/login');
    } else {
      if (user.isFirstTimeLogin) {
        redirect('/getting-started');
      }
    }
  }

  return <>{children}</>;
}
