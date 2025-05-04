import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono, Space_Grotesk } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "focus-visible";
import "./globals.css";
import { Suspense } from "react";
import { ThemeScript } from "@/components/ThemeScript";

// Preload and optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

// Add Space Mono for brutalist headings and accents
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
});

// Add Space Grotesk as an alternative sans-serif option
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-space-grotesk',
});

// Combine font variables for use throughout the app
const fonts = `${inter.variable} ${spaceMono.variable} ${spaceGrotesk.variable}`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#000000',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Brutalist Hats | Premium Hats with Brutalist Design',
  description: 'Discover our collection of premium hats with bold brutalist design. Express your unique style with our high-quality headwear collection.',
  keywords: 'hats, premium hats, brutalist design, headwear, caps, beanies, fashion',
  authors: [{ name: 'Brutalist Hats' }],
  creator: 'Brutalist Hats Team',
  publisher: 'Brutalist Hats',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://brutalist-hats.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Brutalist Hats | Premium Headwear Collection',
    description: 'Discover our collection of premium hats with bold brutalist design. Express your unique style with our high-quality headwear collection.',
    url: 'https://brutalist-hats.vercel.app',
    siteName: 'Brutalist Hats',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brutalist Hats Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brutalist Hats | Premium Headwear Collection',
    description: 'Discover our collection of premium hats with bold brutalist design. Express your unique style.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
    shortcut: '/icons/icon-192x192.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Brutalist Hats',
  },
  applicationName: 'Brutalist Hats',
};

// Import ClientWrapper component
import { ClientWrapper } from "@/components/ClientWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={fonts}>
      <head>
        <ThemeScript />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Brutalist Hats" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`min-h-screen flex flex-col antialiased bg-white font-sans`}>
        <ClientWrapper>
          <main className="flex-1">
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
              {children}
            </Suspense>
          </main>
        </ClientWrapper>
      </body>
    </html>
  );
}
