'use client';

import { useSession } from '@/modules/auth/hooks/useSession';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useSession();

  if (!user && !isLoading) {
    redirect('/login');
  } else if (!user?.isFirstTimeLogin) {
    redirect('/dashboard');
  } else {
    redirect('/getting-started');
  }
}
