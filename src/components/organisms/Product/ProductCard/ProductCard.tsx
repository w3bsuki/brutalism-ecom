"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  Eye, 
  Award, 
  Star, 
  LucideProps, 
  Heart, 
  Clock, 
  Truck, 
  CircleAlert, 
  Share2
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import toast from 'react-hot-toast';
import { ProductCardProps } from "./types";

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showColorTooltip, setShowColorTooltip] = useState(false);
  const [showSizeTooltip, setShowSizeTooltip] = useState(false);
  
  const { addItem } = useCart();
  
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice !== null;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100) 
    : 0;
  
  const isLowStock = product.inStock && (product.inventory && product.inventory < 5);
  const isOutOfStock = !product.inStock;
  
  // Set selected color and size on mount
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.colors, product.sizes]);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent navigation when clicking add to cart
    e.preventDefault();
    e.stopPropagation();
    
    // Don't allow adding if out of stock
    if (isOutOfStock) {
      toast.error("This product is currently out of stock");
      return;
    }
    
    // Prevent multiple clicks
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    // Add the first size and color by default, user can change on product page
    const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    const firstColor = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
    
    addItem(product, firstSize, firstColor, 1);
    
    toast.success((
      t
    ) => (
      <div className="flex items-center">
        <div className="w-10 h-10 mr-3 border-2 border-current relative flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold uppercase">ADDED TO CART</p>
          <p className="text-xs font-medium">
            {product.name}
          </p>
          <p className="text-xs opacity-80">
            {firstSize && `Size: ${firstSize}`} 
            {firstSize && firstColor && " ・ "} 
            {firstColor && `Color: ${firstColor}`}
          </p>
          <div className="mt-2 flex gap-2">
            <Link 
              href="/cart"
              onClick={() => toast.dismiss(t.id)}
              className="bg-[color:var(--accent-bg)] text-black px-2 py-0.5 text-xs font-bold uppercase border border-black hover:opacity-80"
            >
              View Cart
            </Link>
            <button 
              onClick={() => toast.dismiss(t.id)}
              className="bg-transparent text-[color:var(--accent-bg)] px-2 py-0.5 text-xs font-bold uppercase border border-[color:var(--accent-bg)] hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: 4000, 
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
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const adding = !isWishlisted;
    setIsWishlisted(adding);
    
    toast(adding ? "Added to Wishlist" : "Removed from Wishlist", {
      icon: <Heart size={16} className={`${adding ? 'fill-current' : ''}`} />,
    });
  };
  
  const handleColorSelect = (e: React.MouseEvent, color: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
    setShowColorTooltip(true);
    
    // Hide tooltip after 1.5 seconds
    setTimeout(() => {
      setShowColorTooltip(false);
    }, 1500);
  };

  // Size selection handler
  const handleSizeSelect = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    setShowSizeTooltip(true);
    
    // Hide tooltip after 1.5 seconds
    setTimeout(() => {
      setShowSizeTooltip(false);
    }, 1500);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Simple implementation - in a real app this would use the Web Share API
    // or copy the URL to clipboard
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: `/product/${product.slug}`,
      }).catch(() => { 
        toast.error("Could not share product.");
      });
    } else {
      // Fallback - copy to clipboard
      const url = `${window.location.origin}/product/${product.slug}`;
      navigator.clipboard.writeText(url).then(() => {
        toast.success("Link Copied to Clipboard");
      }).catch(() => {
        toast.error("Could not copy link.");
      });
    }
  };

  // Custom star icon component
  const StarIcon = (props: LucideProps) => (
    <Star 
      {...props} 
      className={`${props.className} fill-current`}
      strokeWidth={1}
    />
  );

  // Determine delivery message based on product stock
  const getDeliveryMessage = () => {
    if (isOutOfStock) {
      return { icon: <CircleAlert size={14} className="text-red-500" />, text: "Out of stock" };
    } else if (isLowStock) {
      return { icon: <Clock size={14} className="text-orange-500" />, text: "Low stock" };
    } else {
      return { icon: <Truck size={14} className="theme-accent-text" />, text: "Free shipping" };
    }
  };
  
  const deliveryInfo = getDeliveryMessage();

  return (
    <div 
      className="group relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product container */}
      <Link 
        href={`/product/${product.slug}`}
        className="block relative border-2 sm:border-3 border-black bg-white overflow-hidden h-full flex-1 flex flex-col
            transition-colors duration-200 ease-in-out
            hover:border-[color:var(--accent-bg)]"
        onClick={(e) => {
          // Allow event propagation for normal link clicks
          // Button clicks will stop propagation
        }}
      >
        {/* Product image with centered quick view on hover */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* Main image */}
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
              alt={product.name}
              className={`h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out
                ${isOutOfStock ? 'opacity-70 grayscale-[30%]' : ''}`}
              width={500}
              height={500}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority
            />
          </div>
          
          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-80 text-white text-xs sm:text-sm font-bold uppercase py-2 px-4 
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                Out of Stock
              </div>
            </div>
          )}
          
          {/* Centered Quick View Button on Hover - Fixed event handling */}
          {!isOutOfStock && isHovered && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-200"
              onClick={(e) => e.preventDefault()}
            >
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onQuickView) {
                    // Ensure the function is called with the product
                    onQuickView(product);
                  }
                }}
                className="bg-white text-black text-xs font-bold uppercase py-1.5 px-3 sm:px-4
                    border-2 border-black hover:bg-black hover:text-white transition-all
                    flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    z-10 relative cursor-pointer"
                aria-label="Quick view"
              >
                <Eye size={16} /> VIEW
              </button>
            </div>
          )}
          
          {/* Secondary actions - Always visible for desktop, no hover needed */}
          <div className="absolute top-3 right-3 flex-col gap-2 hidden md:flex">
            {/* Wishlist button */}
            <button 
              onClick={toggleWishlist}
              className={`w-8 h-8 flex items-center justify-center border-2 border-black
                  rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  ${isWishlisted 
                    ? 'theme-accent-bg text-black' 
                    : 'bg-white text-black hover:bg-gray-100'
                  }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={14} className={isWishlisted ? "fill-black" : ""} />
            </button>
          </div>
          
          {/* Badges container */}
          <div className="absolute top-0 left-0 flex flex-col items-start">
            {hasDiscount && (
              <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 
                  border-r-2 border-b-2 border-black mb-1
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                SAVE {discountPercentage}%
              </span>
            )}
            
            {product.isNew && (
              <span className="theme-accent-bg text-black text-[10px] sm:text-xs font-bold px-2 py-0.5 
                  border-r-2 border-b-2 border-black mb-1
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                NEW
              </span>
            )}
            
            {product.isFeatured && (
              <span className="bg-purple-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 
                  border-r-2 border-b-2 border-black mb-1
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center">
                <Award size={10} className="inline mr-1" />
                FEATURED
              </span>
            )}
            
            {isLowStock && !isOutOfStock && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 
                  border-l-2 border-b-2 border-black
                  shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)]">
                ONLY {product.inventory} LEFT
              </span>
            )}
          </div>
        </div>
        
        {/* Product info section */}
        <div className="p-2 sm:p-3 border-t-2 border-black bg-white flex flex-col flex-grow">
          {/* Product name - larger and more prominent */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 uppercase tracking-tight line-clamp-2 mb-1">
            {product.name}
          </h3>
          
          {/* Separator after name */}
          <div className="h-px bg-gray-200 w-full my-1.5"></div>
          
          {/* Available sizes - replacing category */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="relative mb-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeSelect(e, size)}
                    className={`min-w-[32px] h-6 px-1.5 text-[10px] font-bold border rounded-sm
                      ${selectedSize === size 
                        ? 'bg-gray-900 text-white border-gray-900' 
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'} 
                      relative transition-colors`}
                    title={size}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {/* Size tooltip */}
              {showSizeTooltip && selectedSize && (
                <div className="absolute top-[-30px] left-0 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-90">
                  Size: {selectedSize}
                </div>
              )}
            </div>
          )}
          
          {/* Separator after sizes */}
          <div className="h-px bg-gray-200 w-full mt-1 mb-1"></div>
          
          {/* Available colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="relative mb-1">
              <div className="flex items-center gap-1.5">
                {product.colors.slice(0, 5).map((color) => (
                  <button
                    key={color}
                    onClick={(e) => handleColorSelect(e, color)}
                    className={`h-5 w-5 rounded-full border 
                      ${selectedColor === color ? 'border-gray-900 ring-1 ring-offset-1 ring-gray-900' : 'border-gray-300 hover:border-gray-900'} 
                      relative`}
                    style={{ 
                      backgroundColor: color === 'natural' ? '#e8dcc2' : 
                                      color === 'white' ? '#ffffff' :
                                      color === 'black' ? '#000000' : color
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-xs text-gray-600 ml-1">+{product.colors.length - 5}</span>
                )}
              </div>
              
              {/* Color tooltip */}
              {showColorTooltip && selectedColor && (
                <div className="absolute top-[-30px] left-0 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-90 capitalize">
                  {selectedColor}
                </div>
              )}
            </div>
          )}
          
          {/* Separator between colors and rating - reduced spacing */}
          <div className="h-px bg-gray-200 w-full mb-1"></div>
          
          {/* Rating - reduced spacing */}
          <div className="flex items-center mb-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < Math.floor(product.rating) 
                    ? "theme-accent-text" 
                    : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-[10px] sm:text-xs text-gray-600">
              ({product.reviewCount || 0})
            </span>
          </div>
          
          {/* Separator before Add to Cart button - reduced spacing */}
          <div className="h-px bg-gray-200 w-full mt-1 mb-2"></div>
          
          {/* Buy button with price included */}
          {!isOutOfStock && (
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`theme-accent-bg text-gray-900 text-xs font-bold uppercase py-1.5 px-3 sm:px-4
                  border-2 border-gray-900
                  flex items-center justify-center gap-1.5
                  transition-colors duration-200
                  hover:bg-gray-900 hover:text-white hover:border-[color:var(--accent-bg)]
                  w-full
                  ${isAddingToCart ? 'bg-green-500 text-white' : ''}`}
              aria-label="Add to bag"
            >
              {isAddingToCart ? (
                <>
                  <Check size={16} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Buy · ${displayPrice.toFixed(2)}</span>
                </>
              )}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
} 