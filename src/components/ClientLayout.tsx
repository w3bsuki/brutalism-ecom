"use client";

import { Suspense, useEffect, useState } from "react";
import { BrutalistNavbar } from "@/components/layout/BrutalistNavbar";
import { BrutalistFooter } from "@/components/organisms/BrutalistFooter";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { CartProvider } from "@/components/atoms/CartProvider";
import { ClientInitScript } from "@/components/ClientInitScript";
import { Analytics } from "@/components/analytics";
import { CookieConsentWrapper } from "@/components/molecules/CookieConsent/CookieConsentWrapper";
import { Toaster as HotToaster } from 'react-hot-toast';
import { PWAInstallPrompt } from "@/components/molecules/PWAInstallPrompt";
import { OfflineNotice } from "@/components/molecules/OfflineNotice";
import { AppLoading } from "@/components/molecules/AppLoading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Check if this is running in standalone PWA mode
    const isInStandaloneMode = () => 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone || 
      document.referrer.includes('android-app://');
    
    setIsPWA(isInStandaloneMode());
    
    // Hide the loading screen after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

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
        
        {/* Show loading screen only in PWA mode */}
        {isPWA && isLoading && <AppLoading />}
        
        {/* Offline notice will show when the user loses internet connection */}
        <OfflineNotice />
        
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
        
        {/* PWA Install Prompt - shown only on mobile devices that can install the app */}
        <PWAInstallPrompt />
        
        {/* Performance monitoring */}
        <Analytics />
      </CartProvider>
    </ThemeProvider>
  );
} 