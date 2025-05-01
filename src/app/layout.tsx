import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BrutalistNavbar } from "@/components/layout/BrutalistNavbar";
import { BrutalistFooter } from "@/components/organisms/BrutalistFooter";
import { Toaster } from "@/components/molecules/Toast";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { CartProvider } from "@/components/atoms/CartProvider";
import { ClientInitScript } from "@/components/ClientInitScript";
import { Suspense } from "react";
import { Analytics } from "@/components/analytics";
import { CookieConsentWrapper } from "@/components/molecules/CookieConsent/CookieConsentWrapper";

// Preload and optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: "Hat Store | Premium Headwear Collection",
  description: "Shop our exclusive collection of premium hats for all styles and occasions.",
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  authors: [{ name: 'Hat Store Team' }],
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Hat Store | Premium Headwear Collection",
    description: "Shop our exclusive collection of premium hats for all styles and occasions.",
    type: 'website',
    locale: 'en_US',
  },
};

// Script to prevent flashing of wrong theme on page load
const ThemeScript = () => {
  const themeScript = `
    (function() {
      try {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'pinkBlack' : 'blackYellow';
        
        if (storedTheme === 'pinkBlack' || storedTheme === 'blackYellow') {
          document.documentElement.classList.add(storedTheme);
        } else {
          document.documentElement.classList.add(systemTheme);
        }
      } catch (e) {
        console.error('Failed to access localStorage for theme:', e);
        document.documentElement.classList.add('blackYellow');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-white`}>
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
            
            <main className="flex-1">
              {/* Content wrapped in Suspense for better loading */}
              <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
                {children}
              </Suspense>
            </main>
            
            <Suspense fallback={null}>
              <BrutalistFooter />
            </Suspense>
            
            <Toaster />
            
            {/* Cookie Consent Banner */}
            <CookieConsentWrapper />
            
            {/* Performance monitoring */}
            <Analytics />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
