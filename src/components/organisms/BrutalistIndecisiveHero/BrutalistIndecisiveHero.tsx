"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { BrutalistIndecisiveHeroProps } from "./types";

export function BrutalistIndecisiveHero({ 
  subtitle = "Three options. One decision. Zero regrets.",
  ctaText = "SHOP NOW", 
  ctaLink = "/shop",
  leftHat = {
    name: "Classic Baseball Cap",
    image: "/images/hats/placeholder1.jpg",
    link: "/product/classic-baseball-cap"
  },
  centerHat = {
    name: "Structured Snapback",
    image: "/images/hats/placeholder2.jpg",
    link: "/product/structured-snapback"
  },
  rightHat = {
    name: "Vintage Dad Hat",
    image: "/images/hats/placeholder.jpg",
    link: "/product/vintage-dad-hat"
  }
}: BrutalistIndecisiveHeroProps) {
  const [hoverSide, setHoverSide] = useState<'left' | 'center' | 'right' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const subtitleVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const ctaVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
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
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden border-b-2 border-black bg-white">
      {/* Background diagonal pattern */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_1px,transparent_1px,transparent_15px)]"></div>
      </div>

      {/* Desktop hero layout - Three-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        
        {/* Left column - First hat option - hidden on mobile */}
        <motion.div 
          className="relative overflow-hidden h-full border-r-0 md:border-r-2 border-black hidden md:block" 
          onMouseEnter={() => setHoverSide('left')}
          onMouseLeave={() => setHoverSide(null)}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Option indicator - top center */}
          <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
            <div className="theme-accent-bg text-black font-bold text-sm px-3 py-1 border-2 border-black transform rotate-[-2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]">
              OPTION A
            </div>
          </div>
          
          {/* Image with overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10"></div>
          <Image
            src={leftHat.image}
            alt={leftHat.name}
            fill
            className={`object-cover object-center transition-transform duration-500 ${hoverSide === 'left' ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={90}
          />
          
          {/* Hat name button */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <Link 
              href={leftHat.link}
              className="group relative overflow-hidden bg-black text-white font-bold py-3 px-6 border-3 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{leftHat.name}</span>
              <span className="absolute inset-0 theme-accent-bg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          </div>
        </motion.div>
        
        {/* Center column - Middle hat option - hidden on mobile */}
        <motion.div 
          className="relative overflow-hidden h-full border-r-0 md:border-r-2 border-black hidden md:block" 
          onMouseEnter={() => setHoverSide('center')}
          onMouseLeave={() => setHoverSide(null)}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Option indicator - top center */}
          <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
            <div className="theme-accent-bg text-black font-bold text-sm px-3 py-1 border-2 border-black transform rotate-[0deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]">
              OPTION B
            </div>
          </div>
          
          {/* Image with overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10"></div>
          <Image
            src="/images/hats/placeholder1.jpg"
            alt={centerHat.name}
            fill
            className={`object-cover object-center transition-transform duration-500 ${hoverSide === 'center' ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={90}
          />
          
          {/* Hat name button */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <Link 
              href={centerHat.link}
              className="group relative overflow-hidden bg-black text-white font-bold py-3 px-6 border-3 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{centerHat.name}</span>
              <span className="absolute inset-0 theme-accent-bg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          </div>
        </motion.div>

        {/* Right column - Third hat option - hidden on mobile */}
        <motion.div 
          className="relative overflow-hidden h-full hidden md:block" 
          onMouseEnter={() => setHoverSide('right')}
          onMouseLeave={() => setHoverSide(null)}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Option indicator - top center */}
          <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
            <div className="theme-accent-bg text-black font-bold text-sm px-3 py-1 border-2 border-black transform rotate-[2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]">
              OPTION C
            </div>
          </div>
          
          {/* Image with overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10"></div>
          <Image
            src={rightHat.image}
            alt={rightHat.name}
            fill
            className={`object-cover object-center transition-transform duration-500 ${hoverSide === 'right' ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={90}
          />
          
          {/* Hat name button */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <Link 
              href={rightHat.link}
              className="group relative overflow-hidden bg-black text-white font-bold py-3 px-6 border-3 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{rightHat.name}</span>
              <span className="absolute inset-0 theme-accent-bg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mobile hero layout - Single full-width column */}
      <div className="relative h-full md:hidden">
        {/* Full-size background image for mobile */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hats/placeholder1.jpg"
            alt="Hero background"
            fill
            className="object-cover object-center brightness-75"
            sizes="100vw"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        </div>

        {/* Mobile content container - positioned in center */}
        <div className="relative flex flex-col h-full items-center justify-between pt-4 pb-10 px-4 z-20">
          {/* Top section with subtitle and can't decide badge combined */}
          <div className="flex flex-col items-center gap-4 mt-2">
            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="text-center"
            >
              <div className="bg-black bg-opacity-70 backdrop-blur-sm p-3 border-2 border-white inline-block">
                <h2 className="text-white font-bold text-xl">{subtitle}</h2>
              </div>
            </motion.div>
            
            {/* "Can't decide? Shop all" badge - moved up to subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <div className="flex items-center bg-black/80 backdrop-blur-sm p-2 border border-white/70">
                <span className="text-white font-bold text-sm flex items-center">
                  <BadgeCheck className="w-4 h-4 mr-1.5 text-pink-400" strokeWidth={2} />
                  Can't decide? Shop all styles
                </span>
              </div>
            </motion.div>
          </div>

          {/* Middle hat options for mobile - improved layout */}
          <div className="flex justify-center gap-3 my-4 w-full">
            {/* Hat option A */}
            <div className="relative w-[30%] aspect-square">
              <div className="absolute -top-2 right-1/2 translate-x-1/2 z-30">
                <div className="theme-accent-bg text-black font-bold text-[10px] px-2 py-0.5 border-2 border-black transform rotate-[-2deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)]">
                  A
                </div>
              </div>
              <Link 
                href={leftHat.link}
                className="inline-block relative w-full h-full overflow-hidden border-2 border-white hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
                <Image
                  src={leftHat.image}
                  alt={leftHat.name}
                  fill
                  className="object-cover object-center"
                  sizes="33vw"
                  priority
                />
                {/* Name integrated within the image */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 z-20 py-1">
                  <span className="text-white text-[9px] font-bold">{leftHat.name}</span>
                </div>
              </Link>
            </div>

            {/* Hat option B */}
            <div className="relative w-[30%] aspect-square">
              <div className="absolute -top-2 right-1/2 translate-x-1/2 z-30">
                <div className="theme-accent-bg text-black font-bold text-[10px] px-2 py-0.5 border-2 border-black transform rotate-[0deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)]">
                  B
                </div>
              </div>
              <Link 
                href={centerHat.link}
                className="inline-block relative w-full h-full overflow-hidden border-2 border-white hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
                <Image
                  src={centerHat.image}
                  alt={centerHat.name}
                  fill
                  className="object-cover object-center"
                  sizes="33vw"
                  priority
                />
                {/* Name integrated within the image */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 z-20 py-1">
                  <span className="text-white text-[9px] font-bold">{centerHat.name}</span>
                </div>
              </Link>
            </div>

            {/* Hat option C */}
            <div className="relative w-[30%] aspect-square">
              <div className="absolute -top-2 right-1/2 translate-x-1/2 z-30">
                <div className="theme-accent-bg text-black font-bold text-[10px] px-2 py-0.5 border-2 border-black transform rotate-[2deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)]">
                  C
                </div>
              </div>
              <Link 
                href={rightHat.link}
                className="inline-block relative w-full h-full overflow-hidden border-2 border-white hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
                <Image
                  src={rightHat.image}
                  alt={rightHat.name}
                  fill
                  className="object-cover object-center"
                  sizes="33vw"
                  priority
                />
                {/* Name integrated within the image */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 z-20 py-1">
                  <span className="text-white text-[9px] font-bold">{rightHat.name}</span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Bottom section with CTA button */}
          <div className="flex flex-col items-center gap-4 mt-6">
            {/* Single clear CTA button */}
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <Link 
                href={ctaLink}
                className="relative bg-white text-black font-black text-xl uppercase tracking-tight border-3 border-pink-500 px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:border-white transition-all duration-300 flex items-center"
              >
                {ctaText}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop CTA Button - positioned at the middle center */}
      <motion.div
        variants={ctaVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block"
      >
        <Link 
          href={ctaLink}
          className="relative bg-white text-black font-black text-xl uppercase tracking-tight border-4 border-pink-500 px-10 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:border-white transition-all duration-300 flex items-center"
        >
          {ctaText}
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </motion.div>

      {/* "Can't decide? Get them all" badge - positioned higher up on desktop */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute top-32 left-1/2 -translate-x-1/2 z-30 hidden md:block"
      >
        <div className="flex items-center bg-black/70 backdrop-blur-sm p-2 border border-white/50">
          <span className="text-white font-bold text-sm flex items-center tracking-normal">
            <BadgeCheck className="w-4 h-4 mr-1.5 text-pink-400" strokeWidth={2} />
            Can't decide? Get them all
          </span>
        </div>
      </motion.div>
    </div>
  );
} 