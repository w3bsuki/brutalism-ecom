import { Suspense } from 'react';
import { Metadata, Viewport } from 'next';
import { BrutalistIndecisiveHero } from '@/components/home/BrutalistIndecisiveHero';
import { BrutalistFeaturedCollections } from '@/components/organisms/BrutalistFeaturedCollections';
import { BrutalistTrendingCarousel } from '@/components/home/BrutalistTrendingCarousel';
import { BrutalistLogoRibbon } from '@/components/home/BrutalistLogoRibbon';
import { BrutalistTextMarquee } from '@/components/home/BrutalistTextMarquee';
import { BrutalistSignupCarousel } from '@/components/home/BrutalistSignupCarousel';
import { BrutalistHatImageCarousel } from '@/components/home/BrutalistHatImageCarousel';
import { Collection, Product } from '@/lib/types';
import { getFeaturedCollections, getTrendingProducts } from '@/lib/api';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Home() {
  const collections = await getFeaturedCollections();
  const trendingProducts = await getTrendingProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Brutalist Hero section with two hat options */}
      <BrutalistIndecisiveHero 
        title="INDECISIVE WEAR" 
        subtitle="Two options. One decision. No regrets."
        ctaText="SHOP NOW"
        ctaLink="/shop"
        leftHat={{
          name: "Classic Baseball Cap",
          image: "/images/hats/placeholder1.jpg",
          link: "/product/classic-baseball-cap"
        }}
        rightHat={{
          name: "Vintage Dad Hat",
          image: "/images/hats/placeholder.jpg",
          link: "/product/vintage-dad-hat"
        }}
      />
      
      {/* Signup Carousel */}
      <BrutalistSignupCarousel />
      
      {/* Help Me Decide CTA Section */}
      <div className="relative bg-white py-12 md:py-16 px-4 md:px-8 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_1px,transparent_1px,transparent_10px)]"></div>
        </div>
        
        {/* Removed top & bottom borders to prevent overlap with carousels */}
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side text */}
          <div className="text-center md:text-left md:max-w-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4">Can't Decide Which Hat?</h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-0">
              Our style experts will help you find the perfect hat for your style. Take our quick quiz or chat with our team.
            </p>
          </div>
          
          {/* Right side button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/quiz" className="relative group inline-block">
              <div className="absolute -inset-1 theme-accent-bg group-hover:opacity-80 transition-opacity duration-200"></div>
              <button className="relative z-10 bg-black theme-accent-text font-black text-lg px-6 py-4 uppercase tracking-tight border-2 border-black flex items-center group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform duration-200">
                Take The Quiz
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </a>
            
            <a href="/chat" className="relative group inline-block">
              <div className="absolute -inset-1 theme-accent-bg opacity-50 group-hover:opacity-80 transition-opacity duration-200"></div>
              <button className="relative z-10 bg-white text-black font-black text-lg px-6 py-4 uppercase tracking-tight border-2 border-black flex items-center group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform duration-200">
                Chat With Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Logo Ribbon - temporarily removed
      <BrutalistLogoRibbon />
      */}
      
      {/* Text Marquee before Shop by Style section - fixing to match other marquees */}
      <BrutalistTextMarquee 
        text="🔥 UNLIMITED STYLES 🔥"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={70}
        direction="right"
      />
      
      {/* Full-width Brutalist Featured Collections */}
      <BrutalistFeaturedCollections 
        title="SHOP BY STYLE"
        collections={collections} 
      />

      {/* Brutalist Text Marquee */}
      <BrutalistTextMarquee 
        text="🧢 LIMITED DROPS 🧢"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={80}
      />
      
      {/* Hat Image Carousel - before Trending Products */}
      <BrutalistHatImageCarousel 
        title="HAT GALLERY"
        speed={30}
        direction="right"
      />
      
      {/* Second Brutalist Text Marquee below hat carousel */}
      <BrutalistTextMarquee 
        text="🔥 HOT HATS 🔥"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={80}
        direction="left"
      />

      {/* Brutalist Trending Products Carousel */}
      <BrutalistTrendingCarousel 
        title="HOT RIGHT NOW"
        products={trendingProducts} 
      />
      
      {/* Community Text Marquee */}
      <BrutalistTextMarquee 
        text="❤️ JOIN THE HAT GANG ❤️"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={75}
        direction="right"
      />
    </div>
  );
}
