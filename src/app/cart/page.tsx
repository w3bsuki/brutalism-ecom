"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag, AlertCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { BrutalistTextMarquee } from "@/components/organisms/BrutalistTextMarquee";

export default function CartPage() {
  const router = useRouter();
  const cart = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");

  // Apply promotion code
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promotion code");
      return;
    }
    
    const success = cart.applyPromotion(promoCode);
    if (success) {
      setPromoError("");
    } else {
      setPromoError("Invalid promotion code or minimum order not met");
    }
  };

  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="bg-white">
        <BrutalistTextMarquee 
          text="YOUR CART"
          separator="🛒"
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
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link 
                href="/shop" 
                className="bg-black text-white font-bold py-3 px-6 border-2 border-black theme-hover-accent transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block"
              >
                CONTINUE SHOPPING
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
        text="YOUR CART"
        separator="🛒"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={70}
        direction="left"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold uppercase mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="border-2 sm:border-3 border-black bg-white p-4 sm:p-6">
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-6 sm:py-8 flex">
                    <div className="flex-shrink-0 h-24 w-24 sm:h-32 sm:w-32 border-2 border-black relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 sm:ml-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          <p className="ml-4 font-bold text-lg">
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
                        
                        <div className="mt-1 text-sm text-gray-600">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedSize && item.selectedColor && <span> / </span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <button 
                            onClick={() => cart.updateItemQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize, item.selectedColor)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-black text-black hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-3 font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => cart.updateItemQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-black text-black hover:bg-gray-100"
                            aria-label="Increase quantity"
                            disabled={item.maxQuantity !== null && item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => cart.removeItem(item.id, item.selectedSize, item.selectedColor)}
                          className="text-sm font-medium flex items-center text-gray-700 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
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
                  onClick={() => cart.clearCart()}
                  className="flex items-center text-sm font-bold text-red-600 hover:underline"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="border-2 sm:border-3 border-black bg-white p-4 sm:p-6 sticky top-4">
              <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>
              
              {/* Promo code */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label htmlFor="promo-code" className="block text-sm font-medium mb-2">
                  Promotion Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo-code"
                    name="promo-code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border-2 border-r-0 border-black px-3 py-2 focus:outline-none focus:theme-accent-bg"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="border-2 border-black bg-black text-white px-4 py-2 font-bold theme-hover-accent transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="mt-1 text-red-600 text-xs">{promoError}</p>}
                
                {cart.appliedPromotion && (
                  <div className="mt-2 text-green-600 text-sm flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>
                      {cart.appliedPromotion.code} applied 
                      {cart.appliedPromotion.discountType === 'percentage' 
                        ? ` (${cart.appliedPromotion.discountValue}% off)`
                        : ` ($${cart.appliedPromotion.discountValue.toFixed(2)} off)`
                      }
                    </span>
                  </div>
                )}
              </div>
              
              {/* Order details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${cart.getShippingCost().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                
                {cart.discount > 0 && (
                  <div className="flex justify-between text-red-600 text-sm">
                    <span>Discount</span>
                    <span>-${cart.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Free shipping notice */}
              {cart.subtotal < 50 && (
                <div className="mt-4 p-3 bg-gray-50 border-2 border-black flex items-start text-sm">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" />
                  <p>
                    Add <span className="font-bold">${(50 - cart.subtotal).toFixed(2)}</span> more to qualify for free shipping.
                  </p>
                </div>
              )}
              
              {/* Checkout button */}
              <div className="mt-6">
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-black text-white font-bold py-3 px-6 border-2 border-black theme-hover-accent transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                >
                  CHECKOUT <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              
              {/* Payment methods */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600 mb-2">We accept:</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-10 h-6 bg-gray-800 rounded"></div>
                  <div className="w-10 h-6 bg-blue-600 rounded"></div>
                  <div className="w-10 h-6 bg-red-500 rounded"></div>
                  <div className="w-10 h-6 bg-yellow-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 