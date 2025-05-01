"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { BrutalistLogoRibbonProps, Brand } from "./types";

export function BrutalistLogoRibbon({ 
  title = "BRANDS WE WEAR",
  brands
}: BrutalistLogoRibbonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Default brands if none provided
  const defaultBrands: Brand[] = [
    { name: "INDECISIVE", isMain: true, badge: "TOP BRAND" },
    { name: "Nike" },
    { name: "Adidas" },
    { name: "Supreme" },
    { name: "New Era" },
    { name: "Vans" },
  ];

  // Use provided brands or fallback to defaults
  const displayBrands = brands || defaultBrands;

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Individual logo animation
  const logoVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Main brand special animation
  const mainBrandVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  // Title animation
  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1
      }
    }
  };

  return (
    <section className="w-full py-14 px-6 bg-black theme-accent-text relative overflow-hidden border-b-2 theme-accent-border">
      {/* Background pattern - white lines on black */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Only keep bottom decorative element, remove top to avoid overlap */}
      <div className="absolute bottom-0 right-0 w-full h-2 theme-accent-bg"></div>
      
      {/* Title with brutalist style - white text, theme border */}
      <div className="max-w-7xl mx-auto mb-12 text-center relative">
        <motion.div 
          className="inline-block"
          variants={titleVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1.5 theme-accent-bg rotate-1"></div>
            <h3 className="inline-block text-2xl md:text-3xl font-black uppercase tracking-tighter relative bg-black px-5 py-2 border-2 theme-accent-border z-10 shadow-[2px_2px_0px_0px_rgba(var(--accent-rgb),0.8)] text-white">
              {title}
            </h3>
          </div>
        </motion.div>
      </div>

      {/* Logo ribbon with horizontal scrolling on mobile - fixed visibility */}
      <motion.div 
        className="max-w-7xl mx-auto overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between py-6 md:py-8 border-t-2 border-b-2 theme-accent-border px-4" style={{ marginTop: '2px', marginBottom: '2px' }}>
          {displayBrands.map((brand, index) => (
            <React.Fragment key={brand.name}>
              <motion.div 
                className={`flex-shrink-0 px-2 sm:px-4 md:px-6 my-4 md:my-0 ${brand.isMain ? "w-full md:w-auto mx-auto md:mx-0 md:mr-8" : ""}`}
                variants={brand.isMain ? mainBrandVariants : logoVariants}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-24 h-16 md:w-32 md:h-20 relative transition-all duration-300 flex items-center justify-center`}>
                  {brand.isMain && (
                    <>
                      <div className="absolute inset-0 border-2 theme-accent-border bg-black rotate-2 z-0"></div>
                      <div className="absolute inset-0 border-2 border-black theme-accent-bg -rotate-2 translate-x-1.5 -translate-y-1.5 z-0"></div>
                      {brand.badge && (
                        <div className="absolute -top-3 -right-3 theme-accent-bg text-black text-xs font-bold px-2 py-1 rotate-[-5deg] z-20 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                          {brand.badge}
                        </div>
                      )}
                    </>
                  )}
                  <div className={`w-full h-full relative z-10 flex items-center justify-center`}>
                    {brand.isMain ? (
                      <div className="font-black text-lg md:text-xl uppercase tracking-tighter text-center text-black">
                        {brand.name}
                        <div className="inline-flex items-center ml-2">
                          <BadgeCheck className="w-6 h-6 stroke-black fill-[color:hsl(var(--theme-primary))]" />
                        </div>
                      </div>
                    ) : (
                      <div className="font-bold text-lg md:text-xl uppercase tracking-tighter text-center text-white hover:theme-accent-text transition-colors">
                        {brand.name}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Add separators between logos - now theme color */}
              {index < displayBrands.length - 1 && (
                <span className="hidden md:block h-10 w-1 theme-accent-bg transform rotate-30"></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
      
      {/* Brutalist design element - angled theme bars instead of black */}
      <div className="max-w-7xl mx-auto relative h-2 mt-2">
        <div className="absolute left-0 w-1/3 h-full theme-accent-bg transform -skew-x-12"></div>
        <div className="absolute right-0 w-1/4 h-full theme-accent-bg transform skew-x-12"></div>
      </div>
    </section>
  );
} 