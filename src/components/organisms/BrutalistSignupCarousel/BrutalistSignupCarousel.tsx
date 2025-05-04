"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Instagram,
  Percent, 
  Users,
  ArrowRight,
  MessageSquare,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { BrutalistSignupCarouselProps, SignupCarouselItem } from './types';

export function BrutalistSignupCarousel({ items }: BrutalistSignupCarouselProps) {
  // References to track the carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseVelocity = -1.5; // Slightly faster speed
  const isPaused = useRef(false);
  const contentWidth = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Default carousel items if none provided
  const defaultItems: SignupCarouselItem[] = [
    { 
      icon: <Percent className="w-6 h-6" />, 
      text: "GET 15% OFF WITH CODE: HATLOVER", 
      link: "/shop", 
      highlight: true
    },
    { 
      icon: <Heart className="w-6 h-6" />, 
      text: "JOIN THE HAT GANG", 
      link: "/signup", 
      highlight: true
    },
    { 
      icon: <Instagram className="w-6 h-6" />, 
      text: "FOLLOW US ON INSTAGRAM", 
      link: "https://instagram.com",
      highlight: true
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.17V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8.83" />
        <path d="M9 12.17l3.42-3.53A1 1 0 0 1 13.3 8.4l3 2.8a1 1 0 0 1 .3.73v9.07a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.07a1 1 0 0 1 .3-.73l3-2.8a1 1 0 0 1 .88-.24z" />
        <path d="M12 2v2" />
        <path d="M8 4l3 3" />
        <path d="M16 4l-3 3" />
      </svg>, 
      text: "FOLLOW US ON TIKTOK", 
      link: "https://tiktok.com",
      highlight: true
    },
    { 
      icon: <MessageSquare className="w-6 h-6" />, 
      text: "GET STYLE ADVICE", 
      link: "/chat",
      highlight: true
    },
    { 
      icon: <ShoppingBag className="w-6 h-6" />, 
      text: "FREE SHIPPING ON $50+", 
      link: "/shipping",
      highlight: true
    }
  ];

  // Use provided items or fallback to default
  const carouselItems = items || defaultItems;

  // Create duplicate sets of items for seamless looping
  const duplicatedItems = [...carouselItems, ...carouselItems, ...carouselItems, ...carouselItems, ...carouselItems];
  
  // Calculate content width once on mount
  useEffect(() => {
    if (carouselRef.current) {
      // Get width of a single set of items
      const singleSetWidth = carouselRef.current.scrollWidth / 5;
      contentWidth.current = singleSetWidth;
      
      // Start with x offset at exactly -1 set width for seamless loop
      x.set(-singleSetWidth);
    }
  }, []);
  
  useAnimationFrame((t, delta) => {
    if (isPaused.current || !carouselRef.current || contentWidth.current === 0) return;
    
    // Slower, smoother movement
    const moveBy = baseVelocity * (delta / 15);
    
    // Update the motion value
    x.set(x.get() + moveBy);
    
    // Reset when we've scrolled two content widths (one full loop)
    // This creates a truly seamless infinite loop
    if (x.get() <= -contentWidth.current * 2) {
      x.set(x.get() + contentWidth.current);
    }
  });

  function handleMouseEnter() {
    isPaused.current = true;
  }

  function handleMouseLeave() {
    isPaused.current = false;
    setHoveredIndex(null);
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="bg-black py-7 relative overflow-hidden border-y-2 theme-accent-border"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {/* Background pattern - subtle diagonal lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      <div className="overflow-hidden" ref={carouselRef}>
        <motion.div 
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {duplicatedItems.map((item, i) => (
            <Link 
              href={item.link} 
              key={i}
              target={item.text.includes("FOLLOW") ? "_blank" : undefined}
              rel={item.text.includes("FOLLOW") ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredIndex(i)} 
              onMouseLeave={() => setHoveredIndex(null)}
              className="inline-flex items-center mx-8 md:mx-14 group relative"
            >
              {/* Fixed width container to prevent layout shifts */}
              <div className="relative flex items-center">
                {/* Always visible border with background that changes on hover */}
                <div 
                  className={`absolute inset-0 rounded-md border-2 theme-accent-border transition-colors duration-300 ${
                    hoveredIndex === i ? 'theme-accent-bg border-black' : 'bg-transparent'
                  }`}
                ></div>
                
                {/* Content container with fixed padding */}
                <div className="relative z-10 flex items-center px-5 py-2.5">
                  {/* Icon */}
                  {item.icon && (
                    <span className={`mr-2 transition-colors duration-300 ${
                      hoveredIndex === i ? 'text-black' : 'theme-accent-text'
                    }`}>
                      {item.icon}
                    </span>
                  )}
                  
                  {/* Text with brutalist styling */}
                  <span className={`font-mono text-base md:text-lg font-black tracking-tight transition-colors duration-300 ${
                    hoveredIndex === i ? 'text-black' : 'text-white'
                  }`}>
                    {item.text}
                  </span>
                  
                  {/* Arrow indicator - using width to prevent layout shift */}
                  <div className="ml-2 w-4 h-4 flex items-center justify-center">
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <motion.div 
                          className="text-black"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
} 