"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Heart, ShoppingBag, Share2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { BrutalistTextMarquee } from "@/components/organisms/BrutalistTextMarquee";
import toast from "react-hot-toast";
import { ProductQuickView } from "@/components/organisms/Product/ProductQuickView/ProductQuickView";
import { Product } from "@/types/product";

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1,
      selectedSize: product.sizes?.[0] || null,
      selectedColor: product.colors?.[0] || null,
    });
    
    toast.success(`${product.name} added to cart`, {
      icon: <ShoppingBag size={16} />,
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId);
    toast.success("Item removed from wishlist", {
      icon: <Heart size={16} />,
    });
  };

  const handleShare = (product: Product) => {
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

  // Empty wishlist state
  if (items.length === 0) {
    return (
      <div className="bg-white">
        <BrutalistTextMarquee 
          text="YOUR WISHLIST"
          separator="❤️"
          bgColor="bg-black"
          textColor="text-white"
          borderColor="theme-accent-bg"
          speed={70}
          direction="left"
        />
        
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto flex flex-col items-center text-center">
            <div className="bg-gray-50 border-2 sm:border-3 border-black p-6 sm:p-8 w-full mb-8">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gray-100 border-2 border-black rounded-full">
                <Heart className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Start saving your favorite products to build your wishlist.
              </p>
              <Link 
                href="/shop" 
                className="bg-black text-white font-bold py-3 px-6 border-2 border-black theme-hover-accent transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block"
              >
                EXPLORE PRODUCTS
              </Link>
            </div>
            
            <div className="w-full border-2 sm:border-3 border-black p-6 sm:p-8 bg-white">
              <h3 className="font-bold text-lg mb-4">Need inspiration?</h3>
              <p className="text-gray-600 mb-6">Check out our featured collections or bestsellers.</p>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/collections/featured" 
                  className="bg-gray-100 text-black font-bold py-3 px-4 border-2 border-black hover:bg-gray-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center"
                >
                  FEATURED
                </Link>
                <Link 
                  href="/collections/bestsellers" 
                  className="bg-gray-100 text-black font-bold py-3 px-4 border-2 border-black hover:bg-gray-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center"
                >
                  BESTSELLERS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <BrutalistTextMarquee 
        text="YOUR WISHLIST"
        separator="❤️"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={70}
        direction="left"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold uppercase mb-8">Your Wishlist</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist items */}
          <div className="lg:col-span-2">
            <div className="border-2 sm:border-3 border-black bg-white p-4 sm:p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <li key={item.id} className="border-2 border-black p-4 relative">
                    <div className="relative h-48 w-full mb-4 bg-gray-100 border-2 border-black">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Product badges */}
                      {item.isNew && (
                        <div className="absolute top-2 left-2 bg-black text-white font-bold text-xs px-2 py-1">
                          NEW
                        </div>
                      )}
                      
                      {item.salePrice && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white font-bold text-xs px-2 py-1">
                          SALE
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="font-bold text-lg">
                          {item.salePrice ? (
                            <>
                              <span className="text-red-600">${item.salePrice.toFixed(2)}</span>
                              <span className="text-gray-500 text-sm line-through ml-2">${item.price.toFixed(2)}</span>
                            </>
                          ) : (
                            <span>${item.price.toFixed(2)}</span>
                          )}
                        </p>
                      </div>
                      
                      <div className="mt-1 text-sm text-gray-600 mb-4">
                        {item.category && <span className="bg-gray-100 px-2 py-1 text-xs uppercase">{item.category}</span>}
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 bg-black text-white font-bold py-2 px-4 border-2 border-black hover:theme-accent-bg hover:text-black transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add to Cart
                        </button>
                        
                        <button 
                          onClick={() => openQuickView(item)}
                          className="bg-white text-black font-bold py-2 px-4 border-2 border-black hover:bg-gray-100 transition-colors"
                        >
                          Quick View
                        </button>
                        
                        <button 
                          onClick={() => handleShare(item)}
                          className="bg-white text-black border-2 border-black w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Share product"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        
                        <button 
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="bg-white text-red-600 border-2 border-black w-10 h-10 flex items-center justify-center hover:bg-red-50 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex justify-between">
                <Link
                  href="/shop"
                  className="flex items-center text-sm font-bold hover:underline"
                >
                  ← Continue Shopping
                </Link>
                
                <button
                  onClick={() => clearWishlist()}
                  className="flex items-center text-sm font-bold text-red-600 hover:underline"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Wishlist
                </button>
              </div>
            </div>
          </div>
          
          {/* Wishlist sidebar */}
          <div className="lg:col-span-1">
            <div className="border-2 sm:border-3 border-black bg-white p-4 sm:p-6 sticky top-4">
              <h2 className="text-xl font-bold uppercase mb-6">Wishlist Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-base font-medium">
                  <span>Total Items</span>
                  <span>{items.length}</span>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                  <span className="font-bold">Estimated Total Value</span>
                  <span className="font-bold">
                    ${items.reduce((total, item) => total + (item.salePrice || item.price), 0).toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Add all to cart button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    items.forEach(item => handleAddToCart(item));
                    toast.success("All items added to cart");
                  }}
                  className="w-full bg-black text-white font-bold py-3 px-6 border-2 border-black theme-hover-accent transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                >
                  ADD ALL TO CART <ShoppingBag className="ml-2 h-4 w-4" />
                </button>
              </div>
              
              {/* Go to cart button */}
              <div className="mt-4">
                <Link 
                  href="/cart"
                  className="w-full bg-white text-black font-bold py-3 px-6 border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  GO TO CART <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Recommendations section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4">Need More Ideas?</h3>
                <p className="text-gray-600 mb-4 text-sm">Explore our collections or trending products for more inspiration.</p>
                <div className="grid grid-cols-1 gap-2">
                  <Link 
                    href="/shop" 
                    className="bg-gray-100 text-black font-bold py-2 px-4 border-2 border-black hover:bg-gray-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center text-sm"
                  >
                    BROWSE ALL PRODUCTS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick View Modal */}
      {isQuickViewOpen && quickViewProduct && (
        <ProductQuickView 
          product={quickViewProduct}
          open={isQuickViewOpen}
          onClose={closeQuickView}
        />
      )}
    </div>
  );
} 