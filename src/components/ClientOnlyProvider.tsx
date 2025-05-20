// src/components/ClientOnlyProvider.tsx
'use client';

import { queryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

const ClientOnlyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors expand />
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default ClientOnlyProvider;
