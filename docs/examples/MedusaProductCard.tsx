import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useMedusaCart } from '@/hooks/use-medusa-cart';
import { useMedusaWishlist } from '@/hooks/use-medusa-wishlist';

type ProductCardProps = {
  product: {
    id: string;
    handle: string;
    title: string;
    thumbnail: string;
    description: string;
    price?: {
      calculated_price: string;
      original_price?: string;
      difference?: string;
      price_type?: string;
    };
    variants: Array<{
      id: string;
      prices: Array<{
        amount: number;
        currency_code: string;
      }>;
    }>;
    collection?: {
      title: string;
    };
    metadata?: {
      isNew?: boolean;
      isTrending?: boolean;
    };
  };
};

const MedusaProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem: addToCart } = useMedusaCart();
  const { addItem: addToWishlist } = useMedusaWishlist();
  
  // Default to the first variant for add to cart
  const defaultVariantId = product.variants[0]?.id;
  
  // Format price from Medusa format (cents) to dollars
  const getFormattedPrice = () => {
    const amount = product.variants[0]?.prices[0]?.amount || 0;
    return (amount / 100).toFixed(2);
  };
  
  // Handle add to cart
  const handleAddToCart = async () => {
    try {
      if (defaultVariantId) {
        await addToCart(defaultVariantId, 1);
        toast.success(`${product.title} added to cart!`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(product.id);
      toast.success(`${product.title} added to wishlist!`);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add item to wishlist");
    }
  };
  
  return (
    <div 
      className="group relative w-full rounded-lg shadow-lg border border-red-600 theme-element theme-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        <Link href={`/product/${product.handle}`}>
          <div className="relative w-full h-full">
            {product.thumbnail ? (
              <Image 
                src={product.thumbnail} 
                alt={product.title} 
                fill 
                style={{ objectFit: 'cover' }}
                className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No image
              </div>
            )}
          </div>
        </Link>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.metadata?.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              NEW
            </span>
          )}
          {product.metadata?.isTrending && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
              TRENDING
            </span>
          )}
        </div>
        
        {/* Quick actions */}
        <div 
          className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={handleAddToWishlist}
            className="p-2 rounded-full bg-white hover:bg-gray-100 theme-element border border-red-600 focus:outline-none"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-white hover:bg-gray-100 theme-element border border-red-600 focus:outline-none"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 theme-element-light">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold theme-text">
              <Link href={`/product/${product.handle}`} className="hover:underline">
                {product.title}
              </Link>
            </h3>
            {product.collection && (
              <p className="text-sm text-gray-600 theme-subtext">
                {product.collection.title}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-bold theme-accent-text">
              ${getFormattedPrice()}
            </p>
            {product.price?.original_price && product.price.original_price !== product.price.calculated_price && (
              <p className="text-sm text-gray-500 line-through">
                ${product.price.original_price}
              </p>
            )}
          </div>
        </div>
        
        {/* Mobile Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="md:hidden w-full mt-4 px-4 py-2 bg-red-600 text-white rounded font-bold theme-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MedusaProductCard; 