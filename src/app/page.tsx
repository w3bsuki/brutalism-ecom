import { Suspense, lazy } from 'react';
import { Metadata, Viewport } from 'next';
import { BrutalistIndecisiveHero } from '@/components/organisms/BrutalistIndecisiveHero';
// Lazy load heavier components
const BrutalistFeaturedCollections = lazy(() => import('@/components/organisms/BrutalistFeaturedCollections').then(mod => ({ default: mod.BrutalistFeaturedCollections })));
const BrutalistTrendingCarousel = lazy(() => import('@/components/organisms/BrutalistTrendingCarousel').then(mod => ({ default: mod.BrutalistTrendingCarousel })));
const BrutalistLogoRibbon = lazy(() => import('@/components/organisms/BrutalistLogoRibbon').then(mod => ({ default: mod.BrutalistLogoRibbon })));
const BrutalistTextMarquee = lazy(() => import('@/components/organisms/BrutalistTextMarquee').then(mod => ({ default: mod.BrutalistTextMarquee })));
const BrutalistSignupCarousel = lazy(() => import('@/components/organisms/BrutalistSignupCarousel').then(mod => ({ default: mod.BrutalistSignupCarousel })));
const BrutalistHatImageCarousel = lazy(() => import('@/components/organisms/BrutalistHatImageCarousel').then(mod => ({ default: mod.BrutalistHatImageCarousel })));
import { Collection, Product } from '@/lib/types';
import { getFeaturedCollections, getTrendingProducts } from '@/lib/api';
// Import RecentlyViewedSection component
import { RecentlyViewedSection } from '@/components/organisms/Product/RecentlyViewedSection';
import { BestsellersSection } from '@/components/organisms/Home/BestsellersSection';

// Loading fallbacks
const TextMarqueeFallback = () => <div className="w-full h-16 bg-black animate-pulse"></div>;
const CarouselFallback = () => <div className="w-full h-64 bg-gray-100 animate-pulse"></div>;
const CollectionsFallback = () => <div className="w-full h-96 bg-gray-100 animate-pulse"></div>;

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

  // Mock bestseller products - in a real app you'd fetch these from your API
  const bestsellerProducts = trendingProducts.slice(0, 4);

  // Mock customer testimonials
  const testimonials = [
    {
      id: '1',
      text: "The 'Classic Dad Hat' is exactly what I've been searching for. Fits perfectly and looks even better in person!",
      author: "Alex K.",
      rating: 5,
      productName: "Classic Dad Hat"
    },
    {
      id: '2',
      text: "Love my brutalist cap! The quality is outstanding and shipping was super fast. Will definitely be back for more.",
      author: "Jamie T.",
      rating: 5,
      productName: "Brutalist Black Cap"
    },
    {
      id: '3',
      text: "Finally found a hat that fits my style. The attention to detail is amazing and the design is totally unique.",
      author: "Sam R.",
      rating: 5,
      productName: "Structured 6-Panel"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Brutalist Hero section with two hat options */}
      <BrutalistIndecisiveHero 
        subtitle="Three options. One decision. Zero regrets."
        ctaText="SHOP NOW"
        ctaLink="/shop"
        leftHat={{
          name: "Classic Baseball Cap",
          image: "/images/hats/placeholder1.jpg",
          link: "/product/classic-baseball-cap"
        }}
        centerHat={{
          name: "Structured Snapback",
          image: "/images/hats/placeholder2.jpg",
          link: "/product/structured-snapback"
        }}
        rightHat={{
          name: "Vintage Dad Hat",
          image: "/images/hats/placeholder.jpg",
          link: "/product/vintage-dad-hat"
        }}
      />
      
      {/* Signup Carousel */}
      <Suspense fallback={<CarouselFallback />}>
        <BrutalistSignupCarousel />
      </Suspense>
      
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black font-mono uppercase tracking-tighter mb-4">Can't Decide Which Hat?</h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-0">
              Our style experts will help you find the perfect hat for your style. Take our quick quiz or chat with our team.
            </p>
          </div>
          
          {/* Right side button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/quiz" className="relative group inline-block">
              <div className="absolute -inset-1 theme-accent-bg opacity-70 group-hover:opacity-100 transition-opacity duration-200"></div>
              <button className="relative z-10 bg-black theme-accent-text font-black font-mono text-lg px-6 py-4 uppercase tracking-tight border-2 border-black flex items-center">
                Take The Quiz
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="absolute -inset-[3px] border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            
            <a href="/chat" className="relative group inline-block">
              <div className="absolute -inset-1 theme-accent-bg opacity-50 group-hover:opacity-80 transition-opacity duration-200"></div>
              <button className="relative z-10 bg-white text-black font-black font-mono text-lg px-6 py-4 uppercase tracking-tight border-2 border-black flex items-center">
                Chat With Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </button>
              <span className="absolute -inset-[3px] border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Logo Ribbon - temporarily removed
      <Suspense fallback={<CarouselFallback />}>
        <BrutalistLogoRibbon />
      </Suspense>
      */}
      
      {/* Text Marquee before Shop by Style section - fixing to match other marquees */}
      <Suspense fallback={<TextMarqueeFallback />}>
        <BrutalistTextMarquee 
          text="UNLIMITED STYLES"
          separator="🔥"
          bgColor="bg-black"
          textColor="text-white"
          borderColor="theme-accent-bg"
          speed={75}
          direction="right"
        />
      </Suspense>
      
      {/* Full-width Brutalist Featured Collections */}
      <Suspense fallback={<CollectionsFallback />}>
        <BrutalistFeaturedCollections 
          title="SHOP BY STYLE"
          collections={collections} 
        />
      </Suspense>
      
      {/* ADDED: Bestsellers Marquee */}
      <Suspense fallback={<TextMarqueeFallback />}>
        <BrutalistTextMarquee 
          text="BESTSELLERS"
          separator="🏆"
          bgColor="bg-black"
          textColor="text-white"
          borderColor="theme-accent-bg"
          speed={75}
          direction="left"
        />
      </Suspense>

      {/* Bestsellers Section - Now uses the extracted client component */}
      <BestsellersSection bestsellerProducts={bestsellerProducts} />

      {/* Brutalist Text Marquee */}
      <Suspense fallback={<TextMarqueeFallback />}>
        <BrutalistTextMarquee 
          text="LIMITED DROPS"
          separator="🧢"
          bgColor="bg-black"
          textColor="text-white"
          borderColor="theme-accent-bg"
          speed={75}
          direction="left"
        />
      </Suspense>
      
      {/* Hat Image Carousel - before Trending Products */}
      <Suspense fallback={<CarouselFallback />}>
        <BrutalistHatImageCarousel 
          title="HAT GALLERY"
          speed={30}
          direction="right"
        />
      </Suspense>
      
      {/* Second Brutalist Text Marquee below hat carousel */}
      <Suspense fallback={<TextMarqueeFallback />}>
        <BrutalistTextMarquee 
          text="HOT HATS"
          separator="🔥"
          bgColor="bg-black"
          textColor="text-white"
          borderColor="theme-accent-bg"
          speed={75}
          direction="left"
        />
      </Suspense>

      {/* Brutalist Trending Products Carousel */}
      <Suspense fallback={<CarouselFallback />}>
        <BrutalistTrendingCarousel 
          title="HOT RIGHT NOW"
          products={trendingProducts} 
        />
      </Suspense>
      
      {/* ADDED: Testimonial Marquee */}
      <Suspense fallback={<TextMarqueeFallback />}>
        <BrutalistTextMarquee 
          text="TRUSTED REVIEWS"
          separator="⭐"
          bgColor="bg-black"
          textColor="text-white"
          borderColor="theme-accent-bg"
          speed={75}
          direction="right"
        />
      </Suspense>

      {/* ADDED: Customer Testimonials with brutalist styling */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          {/* Keep this headline div for testimonials */}
          <div className="relative mb-8">
            <h2 className="text-3xl md:text-4xl font-black font-mono uppercase tracking-tighter inline-block bg-white pr-4">
              WHAT OTHERS SAY
            </h2>
            <div className="absolute bottom-[0.6rem] w-full h-[4px] bg-black -z-10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border-3 border-black bg-white p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? "theme-accent-text" : "text-gray-300"}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base italic mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold">{testimonial.author}</p>
                    <p className="text-xs text-gray-600">On {testimonial.productName}</p>
                  </div>
                  <a href="/reviews" className="text-xs font-bold uppercase hover:theme-accent-text">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Text Marquee - MOVED to above newsletter signup */}
      <Suspense fallback={<TextMarqueeFallback />}>
        <BrutalistTextMarquee 
          text="JOIN THE HAT GANG"
          separator="❤️"
          bgColor="bg-black"
          textColor="text-white"
          borderColor="theme-accent-bg"
          speed={75}
          direction="right"
        />
      </Suspense>

      {/* ADDED: Newsletter Signup with Value Proposition in brutalist style */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative border-3 border-black overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_1px,transparent_1px,transparent_10px)]"></div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative">
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black uppercase mb-4 tracking-tighter">JOIN THE HAT REVOLUTION</h2>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <span className="text-lg theme-accent-text font-bold mr-2">✓</span>
                    <span className="text-sm">Exclusive early access to new hat drops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lg theme-accent-text font-bold mr-2">✓</span>
                    <span className="text-sm">15% off your first order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lg theme-accent-text font-bold mr-2">✓</span>
                    <span className="text-sm">Limited-edition styles only for subscribers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lg theme-accent-text font-bold mr-2">✓</span>
                    <span className="text-sm">Free shipping on orders over $50</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2">
                <form className="flex flex-col space-y-4">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full py-3 px-4 border-3 border-black focus:outline-none focus:ring-2 focus:ring-black" 
                      required
                    />
                    <div className="absolute -bottom-[3px] -right-[3px] w-4 h-4 bg-black rotate-45"></div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-black text-white py-3 px-4 font-bold uppercase border-3 border-black hover:theme-accent-bg hover:theme-accent-text transform hover:-translate-y-1 transition-transform duration-200"
                  >
                    Subscribe Now
                  </button>
                  
                  <p className="text-xs text-gray-500">
                    By subscribing, you agree to our <a href="/privacy-policy" className="underline">Privacy Policy</a> and <a href="/terms-of-service" className="underline">Terms of Service</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
