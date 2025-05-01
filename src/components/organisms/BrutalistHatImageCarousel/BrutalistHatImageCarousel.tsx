"use client";

/**
 * BrutalistHatImageCarousel
 * 
 * A visually striking, auto-scrolling gallery that showcases all hat images in a continuous
 * horizontal strip with brutalist design elements. Features:
 * - Continuous scrolling animation with adjustable speed and direction
 * - Pauses on hover and has manual pause/resume controls
 * - Brutalist design aesthetic with bold borders, shadows, and decorative elements
 * - Responsive sizing for different screen sizes
 * - Image hover effects with scaling and yellow highlight border
 */

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play, ArrowUpRight, Eye, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './BrutalistHatImageCarousel.module.css';
import { ProductQuickView } from '@/components/organisms/Product/ProductQuickView';
import { BrutalistHatImageCarouselProps } from './types';

export function BrutalistHatImageCarousel({
  speed = 10, // Reduced speed for an even slower animation
  direction = 'left',
  title = "HAT GALLERY",
  images
}: BrutalistHatImageCarouselProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hatImages, setHatImages] = useState<string[]>([]);
  const [currentDirection, setCurrentDirection] = useState(direction);
  const [animationDuration, setAnimationDuration] = useState(90); // Longer default duration
  const [quickViewImage, setQuickViewImage] = useState<string | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Sample product data for quick view (placeholder)
  const sampleProduct = {
    id: "sample-hat",
    name: "Hat Gallery Item",
    description: "This stunning hat from our gallery collection features premium materials and exceptional craftsmanship.",
    price: 79.99,
    category: "Gallery Collection",
    images: quickViewImage ? [quickViewImage] : ["/images/hats/1.jpg"],
    rating: 4.8,
    reviewCount: 24,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Navy"],
    isFeatured: true,
    isNew: false,
    slug: "gallery-hat"
  };
  
  // Calculate animation duration based on speed
  useEffect(() => {
    // Convert speed (px/sec) to duration (seconds for full scroll)
    // Slower by increasing the multiplier even more
    const newDuration = 100 / speed * 20; // Increased multiplier for much slower animation
    setAnimationDuration(newDuration);
  }, [speed]);

  // Collect all hat images
  useEffect(() => {
    if (images) {
      setHatImages(images);
    } else {
      // Default images if none provided
      const defaultImages = Array.from({ length: 23 }, (_, i) => `/images/hats/${i + 1}.jpg`);
      setHatImages(defaultImages);
    }
    setIsLoaded(true);
  }, [images]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Toggle direction
  const toggleDirection = () => {
    setCurrentDirection(prev => prev === 'left' ? 'right' : 'left');
  };

  // Open quick view for a specific hat
  const openQuickView = (imageSrc: string) => {
    setQuickViewImage(imageSrc);
    setIsQuickViewOpen(true);
  };
  
  // Close quick view
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewImage(null);
  };

  // Determine CSS classes based on state
  const getMarqueeClass = () => {
    let className = styles.marquee;
    
    if (isPaused) {
      className += ` ${styles.paused}`;
    }
    
    if (currentDirection === 'right') {
      className += ` ${styles.reverse}`;
    }
    
    return className;
  };

  return (
    <section className="relative w-full bg-black overflow-hidden border-y-4 theme-accent-border py-8 md:py-12">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Title */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8 sm:mb-12 flex justify-center">
        <div className="inline-block relative">
          <div className="absolute -inset-1.5 theme-accent-bg z-0"></div>
          <h2 className="relative text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter bg-black px-4 sm:px-6 py-3 sm:py-4 border-3 sm:border-4 border-white z-10 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
            {title}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 theme-accent-bg text-black font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 border-2 border-black z-20 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
              GALLERY
            </div>
          </h2>
        </div>
      </div>
      
      {/* Main carousel */}
      <div className="relative z-10 py-4 md:py-8 overflow-hidden max-w-[92%] sm:max-w-[94%] mx-auto">
        {/* Left Control Button - adjusted for mobile */}
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="absolute left-[-5px] sm:left-[-10px] top-1/2 transform -translate-y-1/2 z-30 w-8 h-16 sm:w-12 sm:h-20 md:w-14 md:h-24 bg-black text-theme-accent-text border-2 sm:border-4 border-white hover:bg-theme-accent-bg hover:text-black transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
          aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
        >
          {isPaused ? 
            <Play className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" /> : 
            <Pause className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          }
        </button>
        
        {/* The infinite carousel container */}
        <div className={styles.marqueeContainer}>
          <div 
            ref={marqueeRef}
            className={getMarqueeClass()}
            style={{ 
              '--duration': `${animationDuration}s` 
            } as React.CSSProperties}
          >
            <div className={styles.marqueeGroup}>
              {hatImages.map((src, index) => (
                <div 
                  key={`${src}-${index}`}
                  className="mx-2 sm:mx-3 md:mx-4 flex-shrink-0 group relative"
                >
                  <Link href={`/shop`} className="block relative">
                    <div className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-60 lg:w-52 lg:h-72 relative overflow-hidden border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                      <div className="absolute inset-0 bg-black z-0"></div>
                      <Image 
                        src={src} 
                        alt={`Hat Image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                        className="object-cover z-10 transition-all duration-500 group-hover:scale-110"
                        priority={index < 5}
                      />
                      
                      {/* Frame */}
                      <div className="absolute inset-0 border-2 sm:border-4 border-[color:var(--accent-bg)] opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300"></div>
                      
                      {/* View icon on hover */}
                      <div className="absolute top-0 right-0 bg-[color:var(--accent-bg)] p-1 sm:p-2 border-l-2 border-b-2 border-black z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                      </div>
                      
                      {/* Number tag */}
                      <div className="absolute bottom-0 left-0 bg-black text-white font-bold text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 border-t-2 border-r-2 border-[color:var(--accent-bg)] z-30">
                        #{index + 1}
                      </div>
                      
                      {/* Quick View Button - simplified for mobile */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
                        onClick={(e) => {
                          e.preventDefault();
                          openQuickView(src);
                        }}
                      >
                        <button className="bg-black text-white border-2 border-[color:var(--accent-bg)] py-1 sm:py-2 px-2 sm:px-4 flex items-center gap-1 sm:gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-[color:var(--accent-bg)] hover:text-black font-bold uppercase text-[10px] sm:text-sm shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] sm:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                          <Eye size={12} className="sm:hidden" />
                          <Eye size={16} className="hidden sm:block" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Duplicate for seamless loop */}
            <div className={styles.marqueeGroup}>
              {hatImages.map((src, index) => (
                <div 
                  key={`${src}-clone-${index}`}
                  className="mx-2 sm:mx-3 md:mx-4 flex-shrink-0 group relative"
                >
                  <Link href={`/shop`} className="block relative">
                    <div className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-60 lg:w-52 lg:h-72 relative overflow-hidden border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                      <div className="absolute inset-0 bg-black z-0"></div>
                      <Image 
                        src={src} 
                        alt={`Hat Image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                        className="object-cover z-10 transition-all duration-500 group-hover:scale-110"
                      />
                      
                      {/* Frame */}
                      <div className="absolute inset-0 border-2 sm:border-4 border-[color:var(--accent-bg)] opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300"></div>
                      
                      {/* View icon on hover */}
                      <div className="absolute top-0 right-0 bg-[color:var(--accent-bg)] p-1 sm:p-2 border-l-2 border-b-2 border-black z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                      </div>
                      
                      {/* Number tag */}
                      <div className="absolute bottom-0 left-0 bg-black text-white font-bold text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 border-t-2 border-r-2 border-[color:var(--accent-bg)] z-30">
                        #{index + 1}
                      </div>
                      
                      {/* Quick View Button - simplified for mobile */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
                        onClick={(e) => {
                          e.preventDefault();
                          openQuickView(src);
                        }}
                      >
                        <button className="bg-black text-white border-2 border-[color:var(--accent-bg)] py-1 sm:py-2 px-2 sm:px-4 flex items-center gap-1 sm:gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-[color:var(--accent-bg)] hover:text-black font-bold uppercase text-[10px] sm:text-sm shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] sm:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                          <Eye size={12} className="sm:hidden" />
                          <Eye size={16} className="hidden sm:block" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Direction change button - more visible on mobile */}
        <button 
          onClick={toggleDirection}
          className="absolute right-[-5px] sm:right-[-10px] top-1/2 transform -translate-y-1/2 z-30 w-8 h-16 sm:w-12 sm:h-20 md:w-14 md:h-24 bg-black text-theme-accent-text border-2 sm:border-4 border-white hover:bg-theme-accent-bg hover:text-black transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
          aria-label="Change direction"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M8 3L4 7l4 4"/>
            <path d="M4 7h16"/>
            <path d="M16 21l4-4-4-4"/>
            <path d="M20 17H4"/>
          </svg>
        </button>

        {/* Product Quick View Modal - larger touch targets for mobile */}
        <AnimatePresence>
          {isQuickViewOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => closeQuickView()}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.25 }}
                className="bg-white max-w-md w-full p-4 sm:p-6 relative rounded-none border-4 border-black max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute right-3 top-3 bg-black text-white hover:bg-[color:var(--accent-bg)] hover:text-black w-8 h-8 flex items-center justify-center border-2 border-black transition-colors"
                  onClick={() => closeQuickView()}
                  aria-label="Close quick view"
                >
                  <X size={18} />
                </button>
                
                <div className="pt-5">
                  <h3 className="text-xl sm:text-2xl font-black mb-3 pr-8">{sampleProduct.name}</h3>
                  
                  <div className="aspect-square w-full mb-4 border-2 sm:border-4 border-black relative overflow-hidden">
                    {quickViewImage && (
                      <Image
                        src={quickViewImage}
                        alt={sampleProduct.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="font-black text-2xl mb-1">${sampleProduct.price.toFixed(2)}</div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-4 h-4 ${star <= Math.round(sampleProduct.rating) ? 'text-[color:var(--accent-bg)]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{sampleProduct.reviewCount} reviews</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-sm uppercase mb-2">Size</h4>
                      <div className="flex gap-2">
                        {sampleProduct.sizes.map((size) => (
                          <button 
                            key={size} 
                            className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black font-bold hover:bg-[color:var(--accent-bg)] transition-colors flex items-center justify-center"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-sm uppercase mb-2">Color</h4>
                      <div className="flex gap-2">
                        {sampleProduct.colors.map((color) => (
                          <button 
                            key={color} 
                            className="min-w-[60px] py-1.5 border-2 border-black font-bold text-xs hover:bg-[color:var(--accent-bg)] transition-colors"
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="py-3 px-6 bg-black text-white font-bold border-2 border-black hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors flex-1 flex items-center justify-center">
                      <ShoppingBag className="mr-2 w-4 h-4" />
                      ADD TO CART
                    </button>
                    <Link 
                      href={`/product/${sampleProduct.slug}`}
                      className="py-3 px-6 bg-white text-black font-bold border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-center"
                      onClick={() => closeQuickView()}
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* View All CTA Button */}
      <div className="relative z-10 flex justify-center mt-8 mb-6">
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-[color:var(--accent-bg)] translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200"></div>
          <Link 
            href="/shop"
            className="relative inline-flex items-center justify-center gap-2 bg-black text-white border-4 border-[color:var(--accent-bg)] px-8 py-4 font-black text-xl uppercase tracking-tight hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors duration-300 z-10"
          >
            <span>View All Hats</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
} 