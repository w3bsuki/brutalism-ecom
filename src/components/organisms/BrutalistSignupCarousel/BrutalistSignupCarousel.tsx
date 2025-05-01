"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Instagram,
  Percent, 
  Users,
  ArrowRight,
} from 'lucide-react';
import { BrutalistSignupCarouselProps, SignupCarouselItem } from './types';

export function BrutalistSignupCarousel({ items }: BrutalistSignupCarouselProps) {
  // References to track the carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseVelocity = -1;
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
      icon: null, 
      text: "❤️ JOIN THE GANG", 
      link: "/signup", 
      highlight: true,
      color: "theme-accent-bg"
    },
    { 
      icon: null, 
      text: "📸 FOLLOW US ON INSTAGRAM", 
      link: "https://instagram.com",
      highlight: true,
      color: "theme-accent-bg"
    },
    { 
      icon: null, 
      text: "🎵 FOLLOW US ON TIKTOK", 
      link: "https://tiktok.com",
      highlight: true,
      color: "theme-accent-bg" 
    },
    { 
      icon: null, 
      text: "💰 GET 15% OFF DISCOUNT", 
      link: "/discount",
      highlight: true,
      color: "theme-accent-bg" 
    }
  ];

  // Extract emoji from text for separate rendering
  const extractEmoji = (text: string) => {
    const emojiRegex = /(\p{Emoji})/u;
    const match = text.match(emojiRegex);
    if (match) {
      const emoji = match[0];
      const restOfText = text.replace(emoji, '').trim();
      return { emoji, restOfText };
    }
    return { emoji: '', restOfText: text };
  };

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
      className="bg-black py-6 relative overflow-hidden"
      style={{ 
        margin: 0,
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {/* Background pattern - subtle diagonal lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Top border - consistent 2px height */}
      <div className="absolute top-0 left-0 w-full h-2 theme-accent-bg"></div>
      {/* Bottom border - consistent 2px height */}
      <div className="absolute bottom-0 left-0 w-full h-2 theme-accent-bg"></div>
      
      <div className="overflow-hidden" ref={carouselRef}>
        <motion.div 
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {duplicatedItems.map((item, i) => {
            const { emoji, restOfText } = extractEmoji(item.text);
            return (
              <Link 
                href={item.link} 
                key={i}
                target={item.text.includes("FOLLOW") ? "_blank" : undefined}
                rel={item.text.includes("FOLLOW") ? "noopener noreferrer" : undefined}
                onMouseEnter={() => setHoveredIndex(i)} 
                onMouseLeave={() => setHoveredIndex(null)}
                className={`inline-flex items-center mx-12 md:mx-16 group relative`}
              >
                <div className="relative flex items-center">
                  {/* Text with emoji highlighted */}
                  <span className="relative flex items-center text-white text-sm md:text-base group-hover:theme-accent-text transition-colors font-black">
                    {emoji && (
                      <span className="inline-flex mr-2 text-xl md:text-2xl">
                        {emoji}
                      </span>
                    )}
                    <span>{restOfText}</span>
                    
                    {/* Animated underline on hover */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 theme-accent-bg group-hover:w-full transition-all duration-500 ease-out"></span>
                  </span>
                  
                  {/* Arrow indicator on hover */}
                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.div 
                        className="absolute -right-6 theme-accent-text"
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
              </Link>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
} 