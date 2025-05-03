"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, BadgeCheck, ChevronRight } from "lucide-react";
import { BrutalistFeaturedCollectionsProps } from "./types";

export function BrutalistFeaturedCollections({
  title = "SHOP BY STYLE",
  collections = [],
}: BrutalistFeaturedCollectionsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Container animations for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  // Item animations
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Title animation
  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.2
      }
    }
  };

  // Link button animation
  const linkVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.7
      }
    }
  };

  return (
    <section className="relative w-full bg-black py-10 sm:py-14 md:py-20 px-4 sm:px-6 overflow-hidden border-y-2 theme-accent-border">
      {/* Diagonal lines background pattern - brutalist style */}
      <div className="absolute inset-0 z-0 opacity-15">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Decorative elements - removing both to avoid duplicating with border-y-2 */}
      {/* No longer needed since we have border-y-2 */}
      
      {/* Section title with brutalist style - enhanced and centered */}
      <motion.div 
        className="max-w-7xl mx-auto mb-10 sm:mb-16 md:mb-20 relative z-10 flex justify-center"
        variants={titleVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="relative inline-block">
          <div className="absolute -inset-2 theme-accent-bg z-0"></div>
          <h2 className="relative inline-block text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter px-4 sm:px-6 py-3 sm:py-4 bg-black border-2 border-white z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
            {title}
            <div 
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 theme-accent-bg text-black font-bold text-xs sm:text-sm uppercase px-2 sm:px-3 py-1 border-2 border-black z-20 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
            >
              FEATURED
            </div>
          </h2>
        </div>
      </motion.div>
      
      {/* Collections grid with brutalist styling - optimized responsive layout */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {collections.slice(0, 3).map((collection) => (
          <motion.div 
            key={collection.id}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="group relative"
            onMouseEnter={() => setHoveredItem(collection.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Collection card with thick border and perfect hover animation */}
            <Link 
              href={`/collection/${collection.slug}`}
              className="relative block h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden transition-all duration-300 transform-gpu will-change-transform"
            >
              {/* Offset background for brutalist effect */}
              <div className="absolute inset-0 border-2 border-black theme-accent-bg transform translate-x-2 translate-y-2 z-0"></div>
              
              {/* Main card */}
              <div className="absolute inset-0 border-2 border-white hover:theme-accent-border overflow-hidden z-10 bg-gray-800 transform group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-300">
                {/* Image with fallback */}
                <div className="absolute inset-0">
                  <Image 
                    src={collection.image || "/images/hats/placeholder.jpg"} 
                    alt={collection.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out scale-100 group-hover:scale-105 will-change-transform"
                  />
                  
                  {/* Harsh overlay with smoother transition */}
                  <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300 ease-in-out"></div>
                  
                  {/* Diagonal stripes overlay with hover effect */}
                  <div 
                    className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_20px)] opacity-20 group-hover:opacity-5 mix-blend-multiply pointer-events-none transition-opacity duration-300"
                  ></div>
                </div>
                
                {/* Collection information - responsive text sizes and better spacing for mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white border-t-2 border-black transform translate-y-[calc(100%-4.5rem)] group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1.1,0.3,1)] will-change-transform">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tighter truncate pr-2">{collection.name}</h3>
                    <div className="flex-shrink-0 bg-black text-white p-1.5 sm:p-2 border-2 border-black transform rotate-0 group-hover:rotate-45 group-hover:theme-accent theme-hover-accent transition-all duration-300 ease-out will-change-transform">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <p className="text-black font-mono text-sm mb-3 sm:mb-4 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{collection.description}</p>
                  <button className="inline-flex bg-black text-white px-2 sm:px-3 py-1 sm:py-1.5 font-bold tracking-tight uppercase transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 ease-out will-change-transform theme-hover-accent border-2 border-black items-center text-xs sm:text-sm">
                    View Collection
                    <ChevronRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Collection badge/sticker effect */}
                {collection.badge && (
                  <div 
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 theme-accent-bg text-black px-3 py-1 sm:px-4 sm:py-2 font-black text-base sm:text-xl uppercase tracking-tighter border-2 sm:border-2 border-black transform rotate-[10deg] group-hover:rotate-[5deg] group-hover:scale-110 z-10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                  >
                    {collection.badge}
                    <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                )}
              </div>
              
              {/* Pulse effect on hover - only show on hover */}
              {hoveredItem === collection.id && (
                <motion.div 
                  className="absolute inset-0 theme-accent-bg rounded-full opacity-0 z-5"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: 1.2, 
                    opacity: 0,
                    transition: { duration: 1, repeat: Infinity }
                  }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>
      
      {/* View all collections link with brutalist design - better touch target for mobile */}
      <motion.div 
        className="flex justify-center mt-12 sm:mt-16 md:mt-20"
        variants={linkVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <Link 
          href="/collections" 
          className="relative group inline-block bg-black text-white font-black uppercase px-6 sm:px-8 py-3 sm:py-4 border-2 border-white overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-sm sm:text-base">View All Collections</span>
            <Plus size={18} className="transform group-hover:rotate-90 transition-transform duration-300" />
          </span>
          <span className="absolute inset-0 theme-accent-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="absolute -inset-[3px] border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Link>
      </motion.div>
    </section>
  );
}

export default BrutalistFeaturedCollections; 