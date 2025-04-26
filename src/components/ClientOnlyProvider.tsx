// src/components/ClientOnlyProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const ClientOnlyProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors expand />
      {children}
    </QueryClientProvider>
  );
};

export default ClientOnlyProvider;
