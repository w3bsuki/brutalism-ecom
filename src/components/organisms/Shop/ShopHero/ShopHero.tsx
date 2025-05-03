"use client";

import { ShopHeroProps } from './types';
import { motion } from 'framer-motion';

/**
 * ShopHero component
 * 
 * A brutalist-style hero section for the shop page with decorative elements
 * and a title/subtitle. Enhanced with animations and improved visual design.
 */
export function ShopHero({ 
  title = "SHOP ALL PRODUCTS",
  subtitle = "Browse our complete collection of premium hats and headwear. Find the perfect style to express yourself."
}: ShopHeroProps) {
  // Fixed dot positions to prevent hydration mismatch
  const dotPositions = [
    { top: "15%", left: "10%" },
    { top: "80%", left: "15%" },
    { top: "30%", left: "85%" },
    { top: "60%", left: "8%" },
    { top: "25%", left: "35%" },
    { top: "75%", left: "65%" },
    { top: "45%", left: "75%" },
    { top: "10%", left: "60%" },
    { top: "90%", left: "25%" },
    { top: "50%", left: "50%" },
    { top: "35%", left: "20%" },
    { top: "65%", left: "90%" },
    { top: "20%", left: "70%" },
    { top: "70%", left: "40%" },
    { top: "55%", left: "30%" },
    { top: "85%", left: "55%" },
    { top: "40%", left: "95%" },
    { top: "5%", left: "45%" },
    { top: "95%", left: "75%" },
    { top: "60%", left: "20%" }
  ];

  return (
    <div className="w-full bg-black border-b-4 sm:border-b-[6px] theme-accent-border py-8 sm:py-12 md:py-16 relative overflow-hidden">
      {/* Animated diagonal lines background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Decorative elements - animated with framer-motion */}
      <motion.div 
        className="absolute top-10 right-10 w-16 h-16 sm:w-20 sm:h-20 border-2 theme-accent-border opacity-30 hidden sm:block"
        initial={{ rotate: 0, x: 20 }}
        animate={{ rotate: 12, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-12 h-12 sm:w-16 sm:h-16 border-2 theme-accent-border opacity-30 hidden sm:block"
        initial={{ rotate: 0, x: -20 }}
        animate={{ rotate: -12, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Fixed dot pattern for texture (instead of random) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        {dotPositions.map((pos, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: pos.top,
              left: pos.left,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center relative">
        <motion.div 
          className="relative inline-block mb-4 sm:mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -inset-1 sm:-inset-2 theme-accent-bg rotate-1 z-0"></div>
          <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter px-4 sm:px-6 py-2 sm:py-3 bg-black border-2 sm:border-3 theme-accent-border z-10 shadow-[4px_4px_0px_0px_rgba(253,224,71,0.8)]">
            {title}
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        
        {/* Brutalist icon decoration */}
        <motion.div 
          className="w-12 h-1 bg-white mx-auto mt-6 hidden sm:block"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>
      
      {/* Bottom edge pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/50 z-0"></div>
    </div>
  );
} 