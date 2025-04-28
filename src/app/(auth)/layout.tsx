// src/app/(main)/layout.tsx

import PublicGuard from '@/components/guards/PublicGuard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Authentication - Budget Tracker',
    template: '%s - Budget Tracker',
  },
  description: 'Login or sign up to access your Budget Tracker account.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <PublicGuard>{children}</PublicGuard>;
}
