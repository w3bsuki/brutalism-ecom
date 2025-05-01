"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Check, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { ProductQuickViewProps } from "./types";

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const hasDiscount = product.salePrice !== null;
  const displayPrice = product.salePrice || product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  // Navigation functions for images
  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    // Prevent multiple clicks
    if (isAdded) return;
    
    // If size or color options exist, ensure one is selected
    const sizeToAdd = product.sizes && product.sizes.length > 0 
      ? selectedSize || product.sizes[0]
      : null;
    
    const colorToAdd = product.colors && product.colors.length > 0
      ? selectedColor || product.colors[0]
      : null;

    addItem(product, sizeToAdd, colorToAdd, quantity);
    setIsAdded(true);
    
    // Show toast notification
    toast({
      title: `${quantity > 1 ? `${quantity}x ` : ""}ADDED TO CART`,
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
              {sizeToAdd && `Size: ${sizeToAdd}`} 
              {sizeToAdd && colorToAdd && "・"} 
              {colorToAdd && `Color: ${colorToAdd}`}
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
    
    // Reset added status after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div 
        className="bg-white border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-transform"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b-4 border-black theme-accent-bg">
          <h2 className="text-xl font-black uppercase tracking-tight">Quick View</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors"
            aria-label="Close quick view"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product images section */}
          <div className="flex flex-col gap-2">
            {/* Main image */}
            <div className="aspect-square relative border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Sale tag if discounted */}
              {hasDiscount && (
                <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 border-r-2 border-b-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  SAVE {discountPercentage}%
                </span>
              )}
            </div>
            
            {/* Thumbnail gallery - always shows exactly 3 thumbnails */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {product.images.length > 1 ? (
                // Only show thumbnails if we have more than one image
                Array.from({ length: 3 }).map((_, idx) => {
                  // Calculate which image to show in thumbnails
                  // We want to show the 3 images that aren't currently selected as main
                  let imageIndex = (selectedImageIndex + 1 + idx) % product.images.length;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(imageIndex)}
                      className={`aspect-square border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative hover:opacity-90`}
                      aria-label={`View image ${imageIndex + 1} of ${product.name}`}
                    >
                      <Image
                        src={product.images[imageIndex]}
                        alt={`${product.name} - View ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })
              ) : (
                // If only one image, show three identical thumbnails
                Array.from({ length: 3 }).map((_, idx) => (
                  <button
                    key={idx}
                    className="aspect-square border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative opacity-70"
                    aria-label={`View image of ${product.name}`}
                    disabled
                  >
                    <Image
                      src={product.images[0]}
                      alt={`${product.name}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))
              )}
            </div>
            
            {/* Navigation arrows */}
            {product.images.length > 1 && (
              <div className="flex justify-center items-center mt-2 gap-4">
                <button
                  onClick={handlePreviousImage}
                  className="p-2 border-2 border-black bg-white theme-hover-accent shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-bold text-sm">
                  {selectedImageIndex + 1} / {product.images.length}
                </span>
                <button
                  onClick={handleNextImage}
                  className="p-2 border-2 border-black bg-white theme-hover-accent shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div className="flex flex-col border-2 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-2xl font-black uppercase tracking-tight border-b-2 border-black pb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "theme-accent-text fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Available colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-3">
                <p className="font-bold mb-2 uppercase text-sm">Color:</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const isActive = selectedColor === color;
                    const bgColor = color === 'natural' ? '#e8dcc2' : color;
                    
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative h-8 w-8 rounded-full border-2 transition-colors ${
                          isActive 
                            ? "border-black ring-2 theme-accent-ring ring-offset-1" 
                            : "border-gray-400 hover:border-black"
                        }`}
                        style={{ backgroundColor: bgColor }}
                        aria-label={`Select color ${color}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Available sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-3">
                <p className="font-bold mb-2 uppercase text-sm">Size:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isActive = selectedSize === size;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-9 min-w-[36px] px-2 border-2 font-bold text-sm flex items-center justify-center transition-colors ${
                          isActive
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-black"
                        }`}
                        aria-label={`Select size ${size}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Price and discount */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-2xl font-black ${hasDiscount ? "text-red-600" : "text-black"}`}>
                ${displayPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-gray-500 text-sm line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Quantity selector */}
            <div className="mt-4">
              <p className="font-bold mb-2 uppercase text-sm">Quantity:</p>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-8 h-8 border-2 border-black flex items-center justify-center bg-white disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  <ArrowLeft size={16} />
                </button>
                
                <div className="w-12 h-8 border-t-2 border-b-2 border-black flex items-center justify-center">
                  {quantity}
                </div>
                
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 border-2 border-black flex items-center justify-center bg-white"
                  aria-label="Increase quantity"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Short description */}
            <div className="mt-4 border-t-2 border-black pt-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description.substring(0, 150)}...
              </p>
            </div>
            
            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-3 px-4 theme-border font-bold uppercase flex items-center justify-center transition-colors ${
                  isAdded
                    ? "bg-green-500 text-white"
                    : "theme-accent-bg hover:bg-black hover:text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="mr-2 h-5 w-5" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" /> Add to Bag
                  </>
                )}
              </button>
              
              <Link
                href={`/product/${product.slug}`}
                className="flex-1 py-3 px-4 bg-black text-white theme-border font-bold uppercase flex items-center justify-center theme-hover-accent transition-colors"
                onClick={() => {
                  onClose();
                }}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 