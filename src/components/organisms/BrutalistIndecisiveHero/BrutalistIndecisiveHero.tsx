"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronRight, ArrowRight } from "lucide-react";
import { BrutalistIndecisiveHeroProps } from "./types";

export function BrutalistIndecisiveHero({ 
  title = "INDECISIVE WEAR", 
  subtitle = "Two options. One decision. Zero regrets.",
  ctaText = "SHOP NOW", 
  ctaLink = "/shop",
  leftHat = {
    name: "Classic Baseball Cap",
    image: "/images/hats/placeholder1.jpg",
    link: "/product/classic-baseball-cap"
  },
  rightHat = {
    name: "Vintage Dad Hat",
    image: "/images/hats/placeholder.jpg",
    link: "/product/vintage-dad-hat"
  }
}: BrutalistIndecisiveHeroProps) {
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const subtitleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5
      }
    }
  };

  const ctaVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.7
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  
  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden border-b-2 border-black bg-white">
      {/* Background diagonal pattern */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_1px,transparent_1px,transparent_15px)]"></div>
      </div>

      {/* Main hero grid - optimized for mobile and desktop layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        
        {/* Left column - First hat option - hidden on mobile */}
        <motion.div 
          className="relative overflow-hidden h-[0px] md:h-full border-r-0 md:border-r-2 border-black md:block hidden" 
          onMouseEnter={() => setHoverSide('left')}
          onMouseLeave={() => setHoverSide(null)}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Option indicator - moved to top center */}
          <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
            <div className="theme-accent-bg text-black font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 border-2 border-black transform rotate-[-2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]">
              OPTION A
            </div>
          </div>
          
          {/* Image with grainy overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10"></div>
          <Image
            src={leftHat.image}
            alt={leftHat.name}
            fill
            className={`object-cover object-center transition-transform duration-500 ${hoverSide === 'left' ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={95}
          />
          
          {/* Hat name banner - improved button */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <Link 
              href={leftHat.link}
              className="group relative overflow-hidden bg-black text-white font-bold py-3 px-6 border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{leftHat.name}</span>
              <span className="absolute inset-0 theme-accent-bg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          </div>
        </motion.div>
        
        {/* Middle column - Enhanced professional design */}
        <div className="relative bg-black flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-0 h-full text-center border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden col-span-1 md:col-span-1">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-8">
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          
          {/* Centered Title/Subtitle Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Main title */}
            <motion.div
              className="relative mb-4"
              variants={titleVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <div className="relative inline-block">
                <div className="absolute -inset-1 theme-accent-bg z-0"></div>
                <h1 className="relative text-white text-center font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter leading-none px-5 py-3 bg-black z-10 border-4 border-white">
                  {title}
                </h1>
              </div>
            </motion.div>
            
            {/* Subtitle */}
            <motion.div
              className="text-white text-center font-medium mb-8 md:mb-10 text-base md:text-lg max-w-xs md:max-w-sm relative z-10"
              variants={subtitleVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <p className="mb-3 opacity-90 font-light tracking-wide">{subtitle}</p>
              <div className="w-12 h-1 mx-auto theme-accent-bg mt-4"></div>
            </motion.div>
          </div>
          
          {/* Mobile hat options display - Leave this as is */}
          <div className="flex w-full space-x-4 justify-center mb-8 md:hidden">
            <div className="relative w-[130px] h-[130px]">
              <div className="absolute -top-3 left-0 right-0 flex justify-center z-30">
                <div className="theme-accent-bg text-black font-bold text-[10px] px-2 py-1 border-2 border-black transform rotate-[-2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]">
                  OPTION A
                </div>
              </div>
              <Link 
                href={leftHat.link}
                className="inline-block relative w-[130px] h-[130px] overflow-hidden border-3 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
                <Image
                  src={leftHat.image}
                  alt={leftHat.name}
                  fill
                  className="object-cover object-center"
                  sizes="130px"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs font-bold py-2 text-center z-20 border-t-2 border-white">
                  {leftHat.name}
                </div>
              </Link>
            </div>
            
            <div className="relative w-[130px] h-[130px]">
              <div className="absolute -top-3 left-0 right-0 flex justify-center z-30">
                <div className="theme-accent-bg text-black font-bold text-[10px] px-2 py-1 border-2 border-black transform rotate-[2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]">
                  OPTION B
                </div>
              </div>
              <Link 
                href={rightHat.link}
                className="inline-block relative w-[130px] h-[130px] overflow-hidden border-3 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
                <Image
                  src={rightHat.image}
                  alt={rightHat.name}
                  fill
                  className="object-cover object-center"
                  sizes="130px"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs font-bold py-2 text-center z-20 border-t-2 border-white">
                  {rightHat.name}
                </div>
              </Link>
            </div>
          </div>

        </div>
        
        {/* --- Absolutely Positioned Elements for Middle Column --- */} 

        {/* "Can't decide? Get Both" badge - positioned where discount code was */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-10 w-full px-4 flex justify-center"
        >
          <div className="flex items-center bg-black/50 backdrop-blur-sm p-2 border border-white/30">
            <span className="text-white font-bold text-sm flex items-center tracking-normal">
              <BadgeCheck className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-1.5" strokeWidth={2} />
              Can't decide? Get Both
            </span>
          </div>
        </motion.div>

        {/* Enhanced CTA Button - positioned absolutely at the bottom */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        >
          {/* Discount code moved above the shop button */}
          <div className="mb-4">
            <span className="text-white font-bold text-sm">
              Get 15% OFF with code: <span className="theme-accent-text font-black">HATLOVER</span>
            </span>
          </div>
          
          <a 
            href={ctaLink} 
            className="relative inline-block bg-white text-black font-black text-lg uppercase tracking-tight border-4 border-pink-500 px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:border-white transition-all duration-300"
          >
            <span className="flex items-center">
              {ctaText}
              <ArrowRight className="ml-2" size={18} />
            </span>
          </a>
        </motion.div>

        {/* --- End Absolutely Positioned Elements --- */}

        {/* Right column - Second hat option - hidden on mobile */}
        <motion.div 
          className="relative overflow-hidden h-[0px] md:h-full md:block hidden"
          onMouseEnter={() => setHoverSide('right')}
          onMouseLeave={() => setHoverSide(null)}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Option indicator - moved to top center */}
          <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
            <div className="theme-accent-bg text-black font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 border-2 border-black transform rotate-[2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]">
              OPTION B
            </div>
          </div>
          
          {/* Image with grainy overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10"></div>
          <Image
            src={rightHat.image}
            alt={rightHat.name}
            fill
            className={`object-cover object-center transition-transform duration-500 ${hoverSide === 'right' ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={95}
          />
          
          {/* Hat name banner */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <Link 
              href={rightHat.link}
              className="group relative overflow-hidden bg-black text-white font-bold py-3 px-6 border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{rightHat.name}</span>
              <span className="absolute inset-0 theme-accent-bg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 