"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Check, Eye } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { ProductCardProps } from "./types";

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice !== null;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent navigation when clicking add to cart
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple clicks
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    // Add the first size and color by default, user can change on product page
    const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    const firstColor = product.colors && product.colors.length > 0 ? product.colors[0] : null;
    
    addItem(product, firstSize, firstColor, 1);
    
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
              {firstSize && `Size: ${firstSize}`} 
              {firstSize && firstColor && "・"} 
              {firstColor && `Color: ${firstColor}`}
            </p>
          </div>
        </div>
      ),
      action: (
        <Link href="/cart" className="bg-black text-white px-3 py-1 text-xs font-bold theme-hover-accent uppercase">
          View Cart
        </Link>
      ),
    });
    
    // Reset the button state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group block relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product container - combined image and info */}
      <div className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out bg-white">
        {/* Product image with hover effect */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          
          {/* Mobile action buttons - always visible */}
          <div className="absolute bottom-2 right-2 flex space-x-1 z-10">
            <button 
              onClick={handleQuickView}
              className="w-8 h-8 flex items-center justify-center bg-white text-black border-2 border-black rounded-full theme-hover-accent transition-colors shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-8 h-8 flex items-center justify-center border-2 border-black rounded-full transition-colors shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                isAddingToCart 
                  ? 'bg-green-500 text-white' 
                  : 'bg-black text-white theme-hover-accent'
              }`}
              aria-label="Add to bag"
            >
              {isAddingToCart ? (
                <Check size={16} />
              ) : (
                <ShoppingBag size={16} />
              )}
            </button>
          </div>
          
          {/* Desktop action buttons - visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 hidden sm:flex opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-10">
            <button 
              onClick={handleQuickView}
              className="flex-1 bg-white text-black text-xs md:text-sm font-bold py-2 flex items-center justify-center border-t-2 border-r-1 border-black theme-hover-accent transition-colors"
            >
              QUICK VIEW <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-black text-white text-xs md:text-sm font-bold py-2 flex items-center justify-center border-t-2 border-l-1 border-black theme-hover-accent transition-colors disabled:opacity-70"
            >
              {isAddingToCart ? (
                <>
                  <Check className="mr-1 h-3 w-3 md:h-4 md:w-4" /> ADDED
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-1 h-3 w-3 md:h-4 md:w-4" /> ADD TO BAG
                </>
              )}
            </button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-0 left-0 flex flex-col">
            {product.isNew && (
              <span className="theme-accent-bg text-black text-xs font-bold px-2 py-1 border-r-2 border-b-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                NEW
              </span>
            )}
            
            {product.isFeatured && (
              <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 border-r-2 border-b-2 border-black mt-[2px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                FEATURED
              </span>
            )}
            
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 border-r-2 border-b-2 border-black mt-[2px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                SAVE {discountPercentage}%
              </span>
            )}
          </div>
        </div>
        
        {/* Product info - directly connected to the image */}
        <div className="p-3 border-t-2 border-black bg-white relative group-hover:bg-gray-50 transition-colors duration-300">
          {/* Product name */}
          <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-tight line-clamp-1">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    i < Math.floor(product.rating) 
                      ? "theme-accent-text" 
                      : i < product.rating 
                        ? "theme-accent-text/50" 
                        : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          {/* Available colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2 flex items-center gap-1">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="h-4 w-4 rounded-full border-2 border-black shadow-sm"
                  style={{ 
                    backgroundColor: color === 'natural' ? '#e8dcc2' : color
                  }}
                  title={color}
                />
              ))}
            </div>
          )}
          
          {/* Price */}
          <div className="mt-2 pt-2 border-t border-black flex items-center">
            {hasDiscount ? (
              <>
                <span className="text-sm sm:text-base font-black text-red-600 mr-2">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-base font-black text-black">
                ${displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Corner decorative element for brutalism */}
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black transform rotate-45 group-hover:theme-accent group-hover:text-black transition-colors duration-300"></div>
        </div>
      </div>
    </Link>
  );
} 