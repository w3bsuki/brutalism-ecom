"use client";

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Use useState to ensure the QueryClient is only created once per component instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Default stale time for queries (e.g., 5 minutes)
        staleTime: 1000 * 60 * 5,
        // Default time garbage collection happens for inactive queries
        gcTime: 1000 * 60 * 10,
        // Default retry attempts on failure
        retry: 1,
        // Refetch on window focus can be helpful but sometimes aggressive
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only include Devtools in development environment */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
} 