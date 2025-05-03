"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Heart, ChevronLeft, ChevronRight, X, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductQuickView } from "@/components/organisms/Product/ProductQuickView";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/molecules/Toast";
import { BrutalistTrendingCarouselProps } from "./types";

export function BrutalistTrendingCarousel({
  title = "TRENDING NOW",
  products = [],
}: BrutalistTrendingCarouselProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Set number of products to show per slide based on screen size
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  // Adjust slides per view based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate total number of slides
  const totalSlides = Math.ceil(products.length / slidesPerView);
  
  // Handler for next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  // Handler for previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  // Open quick view modal
  const openQuickView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };
  
  // Close quick view modal
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };
  
  // Add to cart directly from carousel
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add the product with default options
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : null;
    
    addItem(product, defaultSize, defaultColor, 1);
    
    // Show toast notification
    toast({
      title: "ADDED TO CART",
      description: (
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3 border-2 border-black relative flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-bold">{product.name}</p>
            <p className="text-xs font-medium">
              {defaultSize && `Size: ${defaultSize}`} 
              {defaultSize && defaultColor && "・"} 
              {defaultColor && `Color: ${defaultColor}`}
            </p>
          </div>
        </div>
      ),
      action: (
        <Link href="/cart" className="bg-black text-white px-3 py-1 text-xs font-bold hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-[color:var(--accent-bg)]">
          View Cart
        </Link>
      ),
    });
  };

  // Format price with discount if available
  const formatPrice = (price: number, discount?: number) => {
    if (discount && discount > 0) {
      const discountedPrice = price * (1 - discount / 100);
      return (
        <div className="flex flex-col">
          <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm line-through opacity-60">${price.toFixed(2)}</span>
            <span className="text-xs bg-red-600 text-white px-1 py-[1px]">-{discount}%</span>
          </div>
        </div>
      );
    }
    return <span className="text-2xl font-bold">${price.toFixed(2)}</span>;
  };

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden border-y-2 theme-accent-border"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Diagonal lines background pattern - brutalist style */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading with yellow highlight - improved and centered */}
        <div className="mb-14 flex flex-col items-center">
          <div className="relative inline-block">
            <div className="absolute -inset-2 theme-accent-bg z-0"></div>
            <h2 className="relative text-5xl md:text-6xl font-black font-mono uppercase tracking-tighter bg-white px-6 py-3 border-2 border-black z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
              {title}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-red-600 text-white font-bold font-mono text-xs sm:text-sm px-2 sm:px-3 py-1 border-2 border-black z-20 flex items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                <Star className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-1.5 fill-white" /> HOT
              </div>
            </h2>
          </div>
          
          {/* Pagination indicator moved below title */}
          <div className="mt-4 flex items-center gap-2 text-lg bg-black text-white px-3 py-1.5 font-bold font-mono border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
            <span className="font-black theme-accent-text">{currentSlide + 1}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>
        </div>
        
        {/* Products carousel with side controls */}
        <div className="relative" ref={containerRef}>
          {/* Left navigation control - positioned further outside */}
          <button 
            onClick={prevSlide}
            className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-30 w-10 h-16 md:w-12 md:h-20 border-2 border-black bg-white hover:bg-[color:var(--accent-bg)] transition-colors flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="overflow-hidden mx-auto" style={{ width: 'calc(100% - 100px)', margin: '0 auto' }}>
            <motion.div
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isLoaded ? 1 : 0,
                x: `-${currentSlide * 100}%`
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Group products into slides with fixed width to prevent overflow */}
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="min-w-full"
                  style={{ width: '100%' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {products.slice(
                      slideIndex * slidesPerView, 
                      slideIndex * slidesPerView + slidesPerView
                    ).map((product) => (
                      <div key={product.id} className="group relative">
                        <Link 
                          href={`/product/${product.slug}`}
                          className="block relative border-2 border-black hover:border-[color:var(--accent-bg)] bg-white overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_20px_rgba(0,0,0,0.3)]"
                        >
                          {/* Product image with overlay effects */}
                          <div className="relative aspect-square overflow-hidden bg-gray-100">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover object-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 ease-out scale-100 group-hover:scale-110 will-change-transform"
                            />
                            
                            {/* Harsh overlay with smoother transition */}
                            <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity duration-300 ease-in-out"></div>
                            
                            {/* Diagonal stripes overlay with hover effect - improved pattern */}
                            <div 
                              className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_15px)] opacity-15 group-hover:opacity-5 mix-blend-multiply pointer-events-none transition-opacity duration-300"
                            ></div>
                            
                            {/* Hover overlay with action buttons */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                              <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex gap-3">
                                <button 
                                  onClick={(e) => openQuickView(e, product)}
                                  className="bg-white border-2 border-black py-2 px-4 flex items-center gap-2 hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors font-bold font-mono uppercase text-sm shadow-[3px_3px_0_0_#000]"
                                >
                                  <span>Quick View</span>
                                </button>
                                <button 
                                  onClick={(e) => handleAddToCart(e, product)}
                                  className="group relative overflow-hidden bg-black text-white border-2 border-[color:var(--accent-bg)] py-2 px-4 flex items-center gap-2 font-bold font-mono uppercase text-sm shadow-[3px_3px_0_0_#000] hover:border-black transition-all duration-300"
                                >
                                  <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                                    <ShoppingBag size={18} />
                                    <span>Add to Cart</span>
                                  </span>
                                  <span className="absolute inset-0 bg-[color:var(--accent-bg)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                                </button>
                              </div>
                            </div>
                            
                            {/* Sale tag if discounted */}
                            {product.discount && product.discount > 0 && (
                              <div className="absolute top-4 right-0 bg-red-600 text-white font-black px-5 py-1 text-sm uppercase border-y-2 border-l-2 border-black shadow-[2px_2px_0_0_#000]">
                                Sale {product.discount}%
                              </div>
                            )}
                          </div>
                          
                          {/* Product info with improved styling */}
                          <div className="p-5 bg-white border-t-2 border-black">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-black uppercase text-lg tracking-tight line-clamp-1">
                                {product.name}
                              </h3>
                              
                              {/* Wishlist button with better hover effect */}
                              <button 
                                onClick={(e) => e.preventDefault()}
                                className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors" 
                                aria-label="Add to wishlist"
                              >
                                <Heart size={18} className="transform-gpu group-hover:scale-110 transition-transform" />
                              </button>
                            </div>
                            
                            {/* Product category */}
                            <div className="mb-2">
                              <span className="text-xs uppercase font-mono tracking-wider text-gray-500">{product.category}</span>
                            </div>
                            
                            {/* Ratings display */}
                            <div className="flex items-center mb-3">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={`${i < Math.round(product.rating) ? 'text-[color:var(--accent-bg)] fill-[color:var(--accent-bg)]' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              {formatPrice(product.price, product.discount)}
                              
                              {/* Quick view icon with better hover animation */}
                              <div 
                                onClick={(e) => openQuickView(e, product)}
                                className="w-9 h-9 flex items-center justify-center bg-black text-[color:var(--accent-bg)] cursor-pointer transform-gpu hover:scale-110 transition-transform"
                              >
                                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </Link>
                        
                        {/* NEW tag if product is new - improved styling */}
                        {product.isNew && (
                          <div className="absolute top-4 left-4 bg-[color:var(--accent-bg)] text-black px-3 py-1.5 font-black text-sm uppercase border-2 border-black transform rotate-[-4deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-20 group-hover:rotate-[-6deg] group-hover:scale-110 transition-all duration-300">
                            New
                          </div>
                        )}
                        
                        {/* FEATURED tag if product is featured */}
                        {product.isFeatured && (
                          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1.5 font-black text-sm uppercase border-2 border-black transform rotate-[-4deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-20 group-hover:rotate-[-6deg] group-hover:scale-110 transition-all duration-300">
                            Featured
                          </div>
                        )}
                        
                        {/* HOT tag for trending products */}
                        {!product.isNew && !product.isFeatured && (
                          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 font-black text-sm uppercase border-2 border-black transform rotate-[-4deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-20 group-hover:rotate-[-6deg] group-hover:scale-110 transition-all duration-300 flex items-center">
                            <Star className="w-3 h-3 mr-1 fill-[color:var(--accent-bg)]" /> Hot
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Right navigation control - positioned further outside */}
          <button 
            onClick={nextSlide}
            className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-30 w-10 h-16 md:w-12 md:h-20 border-2 border-black bg-white hover:bg-[color:var(--accent-bg)] transition-colors flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* View all products link - brutalist style with yellow hover */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/collections" 
            className="relative group inline-block bg-black text-white px-8 py-4 font-black uppercase border-2 border-white overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>View All Products</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-[color:var(--accent-bg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-[3px] border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>
      </div>
      
      {/* Standardized Product Quick View */}
      <ProductQuickView 
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </section>
  );
} 