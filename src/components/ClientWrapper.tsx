"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Use dynamic import with no SSR for the client components
const ClientLayout = dynamic(() => import('@/components/ClientLayout'), { 
  ssr: false,
  loading: () => <ClientLayoutFallback />
});

function ClientLayoutFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-400 animate-pulse"></div>
      <div className="w-full h-14 bg-black"></div>
      <div className="flex-1">{/* Content will be loaded by ClientLayout */}</div>
      <div className="w-full h-32 bg-black"></div>
    </div>
  );
}

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ClientLayoutFallback />}>
      <ClientLayout>{children}</ClientLayout>
    </Suspense>
  );
} 