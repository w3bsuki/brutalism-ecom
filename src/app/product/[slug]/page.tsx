"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { RecentlyViewedSection } from "@/components/organisms/Product/RecentlyViewedSection";

import { products } from "@/data/products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const unwrappedParams = React.use(params);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { addProduct } = useRecentlyViewed();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const product = products.find((p) => p.slug === unwrappedParams.slug);

  if (!product) {
    notFound();
  }

  // Add to recently viewed when page loads
  useEffect(() => {
    // Only add to recently viewed if we have a valid product
    if (product?.id) {
      addProduct(product);
    }
  }, [unwrappedParams.slug, addProduct]); // Only depends on the slug and memoized addProduct function

  // Handle client-side only rendering to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create structured data for better SEO
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Hat Store',
    },
    offers: {
      '@type': 'Offer',
      url: `https://hatstore.example.com/product/${unwrappedParams.slug}`,
      priceCurrency: 'USD',
      price: product.salePrice || product.price,
      priceValidUntil: '2025-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.5,
      reviewCount: product.reviewCount || 24,
    },
  };

  // Format price with discount
  const formatPrice = (price: number, discount?: number) => {
    if (discount && discount > 0) {
      const discountedPrice = price * (1 - discount / 100);
      return (
        <>
          <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg line-through opacity-60">${price.toFixed(2)}</span>
            <span className="text-sm bg-red-600 text-white px-2 py-1">-{discount}%</span>
          </div>
        </>
      );
    }
    return <span className="text-3xl font-bold">${price.toFixed(2)}</span>;
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    setIsAdded(true);
    addItem(product, selectedSize, selectedColor, quantity);
    
    toast({
      title: "ADDED TO CART!",
      description: (
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold">{product.name}</span>
        </div>
      ),
      action: (
        <Link
          href="/cart"
          className="bg-black text-white px-3 py-1 text-xs font-bold hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-[color:var(--accent-bg)]"
        >
          View Cart
        </Link>
      ),
    });
    
    // Reset the added state after a delay
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <>
      {/* Add JSON-LD structured data only after client-side hydration */}
      {isMounted && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      
      <div className="min-h-screen">
        {/* Brutalist Breadcrumb - made even more prominent */}
        <div className="bg-[color:var(--accent-bg)] border-y-4 border-black py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center font-black text-black text-base">
              <Link href="/" className="hover:underline hover:bg-black hover:text-white px-3 py-1.5 transition-colors">HOME</Link>
              <ChevronRight className="h-5 w-5 mx-3" />
              <Link href="/collections" className="hover:underline hover:bg-black hover:text-white px-3 py-1.5 transition-colors">COLLECTIONS</Link>
              <ChevronRight className="h-5 w-5 mx-3" />
              <span className="bg-black text-white px-3 py-1.5">{product.name.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Product Details - optimized for viewport fit */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Product Images - adjusted height to fit viewport */}
            <div className="relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square">
              <Image 
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Sale tag if discounted */}
              {product.discount && product.discount > 0 && (
                <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-3 py-1 text-sm uppercase border-l-2 border-b-2 border-black">
                  Save {product.discount}%
                </div>
              )}

              {/* New tag */}
              {product.isNew && (
                <div className="absolute top-0 left-0 bg-black text-white font-bold px-3 py-1 text-sm uppercase border-r-2 border-b-2 border-[color:var(--accent-bg)]">
                  NEW
                </div>
              )}
            </div>
            
            {/* Product Info - better layout */}
            <div className="flex flex-col border-4 border-black p-4 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] justify-between">
              {/* Title and Price Section */}
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter mb-3 border-b-4 border-black pb-2">
                  {product.name}
                </h1>
                
                <div className="bg-[color:var(--accent-bg)] -mx-4 px-4 py-3 border-y-2 border-black my-3">
                  {formatPrice(product.price, product.discount)}
                </div>
                
                {/* Description */}
                <div className="prose max-w-none my-3">
                  <p className="font-mono text-sm">{product.description || "No description available for this product."}</p>
                </div>

                {/* Features */}
                <div className="my-4 bg-gray-50 border-2 border-black p-3">
                  <h3 className="text-sm font-black uppercase mb-2 border-b border-black pb-1">FEATURES:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-black mr-2 flex-shrink-0"></div>
                      <span className="text-sm">Premium Materials</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-black mr-2 flex-shrink-0"></div>
                      <span className="text-sm">Adjustable Fit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-black mr-2 flex-shrink-0"></div>
                      <span className="text-sm">Water Resistant</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-black mr-2 flex-shrink-0"></div>
                      <span className="text-sm">Embroidered Logo</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Options Section */}
              <div className="space-y-4">
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-black uppercase mb-2">SIZE:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
                            selectedSize === size
                              ? "bg-black text-white"
                              : "bg-white text-black hover:bg-gray-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-black uppercase mb-2">COLOR:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => {
                        const isActive = selectedColor === color;
                        const bgColor = color === 'natural' ? '#e8dcc2' : color;
                        
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative h-9 w-9 rounded-none border-2 transition-colors ${
                              isActive 
                                ? "border-black ring-2 ring-yellow-300 ring-offset-1" 
                                : "border-gray-400 hover:border-black"
                            }`}
                            style={{ backgroundColor: bgColor }}
                            aria-label={`Select color ${color}`}
                            title={color}
                          >
                            {isActive && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path 
                                    d="M11 1L4.125 9L1 5.5" 
                                    stroke={['white', 'yellow', 'beige', 'natural'].includes(color) ? 'black' : 'white'} 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Quantity and Add to Cart Row */}
                <div className="flex flex-wrap items-end gap-3 mt-4">
                  <div>
                    <h3 className="text-sm font-black uppercase mb-2">QUANTITY:</h3>
                    <div className="flex items-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="border-r-2 border-black px-3 py-1 font-bold hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <div className="px-4 py-1 font-bold min-w-[40px] text-center">
                        {quantity}
                      </div>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="border-l-2 border-black px-3 py-1 font-bold hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <div className="flex-1">
                    <button 
                      onClick={handleAddToCart}
                      disabled={isAdded}
                      className={`w-full border-4 border-black font-black text-base uppercase py-2 px-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] ${
                        isAdded
                          ? "bg-green-500 text-white"
                          : "bg-black text-white hover:bg-[color:var(--accent-bg)] hover:text-black"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={18} />
                          ADDED TO CART
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} />
                          ADD TO CART
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Corner decorative element */}
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-black transform rotate-45"></div>
            </div>
          </div>
          
          {/* Recently viewed products section with brutalist styling */}
          <div className="mt-8">
            <RecentlyViewedSection currentProductId={product.id} />
          </div>
        </div>
      </div>
    </>
  );
} 