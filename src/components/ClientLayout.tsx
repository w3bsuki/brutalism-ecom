"use client";

import { Suspense } from "react";
import { BrutalistNavbar } from "@/components/layout/BrutalistNavbar";
import { BrutalistFooter } from "@/components/organisms/BrutalistFooter";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { CartProvider } from "@/components/atoms/CartProvider";
import { ClientInitScript } from "@/components/ClientInitScript";
import { Analytics } from "@/components/analytics";
import { CookieConsentWrapper } from "@/components/molecules/CookieConsent/CookieConsentWrapper";
import { Toaster as HotToaster } from 'react-hot-toast';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="blackYellow"
      enableSystem={false}
      disableTransitionOnChange={false}
      themes={['blackYellow', 'pinkBlack']}
      storageKey="theme"
    >
      <CartProvider>
        <ClientInitScript />
        {/* Use Suspense boundaries for better loading experience */}
        <Suspense fallback={<div className="fixed top-0 w-full h-2 bg-primary/30 animate-pulse"></div>}>
          <BrutalistNavbar />
        </Suspense>
        
        {children}
        
        <Suspense fallback={null}>
          <BrutalistFooter />
        </Suspense>
        
        {/* Add react-hot-toast Toaster */}
        <HotToaster
          position="bottom-center"
          toastOptions={{
            // Define default options
            className: '',
            duration: 3000,
            style: {
              background: '#000',
              color: '#fff',
              border: '2px solid #fff',
              boxShadow: '4px 4px 0px 0px rgba(255,255,255,1)',
              fontFamily: 'var(--font-space-mono)'
            },
            // Default options for specific types
            success: {
              duration: 2000,
              style: {
                background: '#000',
                color: 'var(--accent-bg)', // Using CSS variable instead of hardcoded #fde047
                border: '2px solid var(--accent-bg)', // Using CSS variable
                boxShadow: '4px 4px 0px 0px var(--accent-bg)', // Using CSS variable 
                fontFamily: 'var(--font-space-mono)'
              },
              iconTheme: {
                primary: 'var(--accent-bg)', // Using CSS variable
                secondary: '#000',
              },
            },
            error: {
              style: {
                background: '#000',
                color: '#ef4444', // red-600
                border: '2px solid #ef4444',
                boxShadow: '4px 4px 0px 0px rgba(239, 68, 68, 1)',
                fontFamily: 'var(--font-space-mono)'
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#000',
              },
            },
          }}
        />
        
        {/* Cookie Consent Banner */}
        <CookieConsentWrapper />
        
        {/* Performance monitoring */}
        <Analytics />
      </CartProvider>
    </ThemeProvider>
  );
} 