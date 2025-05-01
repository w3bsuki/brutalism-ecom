"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const cart = useCart();
  
  const handleRemoveItem = (id: string) => {
    cart.removeItem(id);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    cart.updateItemQuantity(id, newQuantity);
  };

  const subtotal = cart.subtotal;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-8 relative inline-block after:content-[''] after:block after:w-full after:h-1 after:bg-[color:var(--accent-bg)] after:mt-2">
        YOUR CART
      </h1>

      {cart.items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="border-b-2 border-black pb-4 mb-4 hidden md:grid md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <span className="font-black uppercase text-sm">Product</span>
                </div>
                <div className="md:col-span-2 text-center">
                  <span className="font-black uppercase text-sm">Price</span>
                </div>
                <div className="md:col-span-2 text-center">
                  <span className="font-black uppercase text-sm">Quantity</span>
                </div>
                <div className="md:col-span-2 text-right">
                  <span className="font-black uppercase text-sm">Total</span>
                </div>
              </div>

              {cart.items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="border-b-2 border-black py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-6 flex items-center">
                    <div className="relative w-20 h-20 flex-shrink-0 mr-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className=""
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Size: {item.selectedSize || 'One Size'}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 text-sm flex items-center mt-1 md:hidden font-bold"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-center">
                    <p className="md:hidden inline-block mr-2 font-bold">Price:</p>
                    <span className="font-bold">${(item.salePrice || item.price).toFixed(2)}</span>
                  </div>

                  <div className="md:col-span-2 flex items-center md:justify-center">
                    <p className="md:hidden inline-block mr-2 font-bold">Quantity:</p>
                    <div className="flex items-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border-r-2 border-black hover:bg-[color:var(--accent-bg)] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border-r-2 border-black font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[color:var(--accent-bg)] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-right flex justify-between md:block">
                    <p className="md:hidden font-bold">Total:</p>
                    <div className="flex items-center justify-end">
                      <span className="font-bold">
                        ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-black hover:text-red-600 hidden md:block"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} className="hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border-2 border-black bg-[color:var(--accent-bg)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black mb-6 uppercase text-center border-b-2 border-black pb-2">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t-2 border-black pt-2 mt-2 flex justify-between font-black">
                  <span className="uppercase">Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link href="/checkout" className="block w-full">
                <button className="w-full bg-black text-white font-bold py-3 border-2 border-black hover:bg-[color:var(--button-hover-bg)] hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  CHECKOUT NOW
                </button>
              </Link>
              
              <div className="mt-4 text-center">
                <Link href="/collections" className="font-bold text-black hover:underline inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-black bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto">
          <h2 className="text-2xl font-black mb-4 uppercase">Your cart is empty</h2>
          <p className="text-gray-700 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-black text-white px-6 py-3 border-2 border-black font-bold hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            START SHOPPING
          </Link>
        </div>
      )}
    </div>
  );
} 