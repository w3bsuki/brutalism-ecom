"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BrutalistHeroProps, HeroImage } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function BrutalistHero({ 
  title = "ХУЛИГАНКА", 
  subtitle = "Limited drops, unlimited style.", 
  ctaText = "SHOP NOW", 
  ctaLink = "/shop" 
}: BrutalistHeroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Skip loading animation in development mode hot reloads
  useEffect(() => {
    const inDevMode = process.env.NODE_ENV === 'development';
    const skipAnimation = sessionStorage.getItem('skipHeroAnimation') === 'true';
    
    if (inDevMode && skipAnimation) {
      setIsLoading(false);
      return;
    }
    
    if (inDevMode) {
      sessionStorage.setItem('skipHeroAnimation', 'true');
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const images: HeroImage[] = useMemo(() => [
    {
      src: "/images/hats/placeholder.jpg",
      alt: "Brutalist Hat 1",
      caption: "01"
    },
    {
      src: "/images/hats/placeholder1.jpg",
      alt: "Brutalist Hat 2",
      caption: "02"
    },
    {
      src: "/images/hats/placeholder.jpg",
      alt: "Brutalist Hat 3",
      caption: "03"
    },
    {
      src: "/images/hats/placeholder1.jpg",
      alt: "Brutalist Hat 4",
      caption: "04"
    }
  ], []);

  const nextImage = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay effect
  useEffect(() => {
    if (isLoading) return;
    
    const intervalId = setInterval(() => {
      nextImage();
    }, 6000);
    
    return () => clearInterval(intervalId);
  }, [isLoading, nextImage]);

  // Left image index
  const leftIndex = useMemo(() => {
    return currentIndex;
  }, [currentIndex]);

  // Right image index
  const rightIndex = useMemo(() => {
    return (currentIndex + 1) % images.length;
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-[95%] mx-auto h-[700px] overflow-hidden">
      {/* Outer container with border and glow effect */}
      <div className="relative h-full">
        {/* Main content container with primary border */}
        <div className="relative w-full h-full overflow-hidden border-4 border-[color:hsl(var(--theme-primary))] bg-grid-pattern z-10">
          {/* Decorative elements */}
          <div className="absolute top-0 left-8 h-3 w-12 theme-accent-bg z-10"></div>
          <div className="absolute bottom-0 right-10 h-3 w-16 theme-accent-bg z-10"></div>
          <div className="absolute top-1/4 left-24 h-8 w-1 bg-white z-10"></div>
          <div className="absolute bottom-1/4 right-16 h-6 w-1 bg-white z-10"></div>
          
          {/* Loading overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                className="absolute inset-0 bg-black z-50 flex flex-col justify-center items-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-3/4 max-w-lg h-1.5 bg-gray-800 overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="h-full theme-accent-bg"
                    initial={{ width: '0%' }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </motion.div>
                
                <motion.div 
                  className="mt-4 theme-accent-text font-mono text-xs tracking-widest"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  LOADING BRUTALIST EXPERIENCE... {Math.floor(loadingProgress)}%
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main hero grid */}
          <div className="absolute inset-0 grid grid-cols-3 h-full">
            {/* Left column - Image */}
            <div className="relative overflow-hidden h-full border-r-4 border-[color:hsl(var(--theme-primary))]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-black text-white text-lg font-bold p-1 shadow-md z-20">
                {images[leftIndex].caption}
              </div>
              <Image
                src={images[leftIndex].src}
                alt={images[leftIndex].alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                quality={95}
              />
            </div>
            
            {/* Middle column - Black with text */}
            <div className="flex flex-col justify-center items-center bg-black px-4 relative overflow-hidden">
              {/* Decorative elements - minimal and clean */}
              <div className="absolute top-12 right-4 h-20 w-1 theme-accent-bg opacity-70"></div>
              <div className="absolute bottom-[60px] left-4 h-20 w-1 theme-accent-bg opacity-70"></div>
              
              {/* Brand logo/text */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLoading ? 1.0 : 0, duration: 0.5 }}
                className="mb-2"
              >
                <div className="theme-accent-bg px-3 py-1">
                  <span className="text-black text-xs font-mono tracking-widest">ESTABLISHED 2023</span>
                </div>
              </motion.div>
              
              {/* Main title and subtitle */}
              <div className="flex flex-col space-y-6 lg:col-span-1 z-20 p-6 lg:p-8">
                {/* Title */}
                <motion.h1 
                  className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-black uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {title}
                </motion.h1>
                
                {/* Subtitle */}
                <motion.p 
                  className="text-xl text-gray-800 font-medium mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {subtitle}
                </motion.p>
              </div>
              
              {/* CTA */}
              {ctaText && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Link 
                    href={ctaLink || "#"} 
                    className="inline-block py-3 px-8 text-black font-bold bg-[color:hsl(var(--theme-primary))] hover:bg-white border-2 border-[color:hsl(var(--theme-primary))] hover:border-white transition-colors"
                  >
                    {ctaText}
                  </Link>
                </motion.div>
              )}
            </div>
            
            {/* Right column - Image */}
            <div className="relative overflow-hidden h-full border-l-4 border-[color:hsl(var(--theme-primary))]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 right-4 bg-black text-white text-lg font-bold p-1 shadow-md z-20">
                {images[rightIndex].caption}
              </div>
              <Image
                src={images[rightIndex].src}
                alt={images[rightIndex].alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                quality={95}
              />
            </div>
          </div>
          
          {/* Navigation buttons */}
          <motion.div 
            className="absolute bottom-4 right-8 z-30 flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={prevImage}
              className="p-2 bg-[color:hsl(var(--theme-primary))] text-black hover:bg-white border-2 border-[color:hsl(var(--theme-primary))] hover:border-white transition-colors"
              aria-label="Previous image"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="bg-[color:hsl(var(--theme-primary))] text-black px-2 py-1 font-mono font-bold border-2 border-[color:hsl(var(--theme-primary))]">
              {currentIndex + 1}/{images.length}
            </div>
            
            <button 
              onClick={nextImage}
              className="p-2 bg-[color:hsl(var(--theme-primary))] text-black hover:bg-white border-2 border-[color:hsl(var(--theme-primary))] hover:border-white transition-colors"
              aria-label="Next image"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
        
        {/* White glow border */}
        <div className="absolute -inset-1 border border-white opacity-40 pointer-events-none"></div>
      </div>
    </div>
  );
} 