"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const subtotal = cart.subtotal;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    paymentMethod: "credit-card"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would submit to an API endpoint
    // Simulate API call with timeout
    setTimeout(() => {
      // After successful checkout, clear cart and redirect
      cart.clearCart();
      router.push("/checkout/confirmation");
      setIsSubmitting(false);
    }, 1500);
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-black mb-6 relative inline-block after:content-[''] after:block after:w-full after:h-1 after:bg-[color:var(--accent-bg)] after:mt-2">
          CHECKOUT
        </h1>
        <div className="border-2 border-black bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto">
          <p className="mb-6 font-bold">Your cart is empty. Add some products before checkout.</p>
          <Link 
            href="/collections" 
            className="inline-block bg-black text-white px-6 py-3 border-2 border-black font-bold hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            BROWSE PRODUCTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-8 relative inline-block after:content-[''] after:block after:w-full after:h-1 after:bg-[color:var(--accent-bg)] after:mt-2">
        CHECKOUT
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black mb-4 uppercase">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold mb-1 uppercase">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold mb-1 uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-bold mb-1 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
            </div>

            <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black mb-4 uppercase">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-bold mb-1 uppercase">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-bold mb-1 uppercase">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-bold mb-1 uppercase">
                      State / Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-bold mb-1 uppercase">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-bold mb-1 uppercase">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black mb-4 uppercase">Payment Method</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit-card"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === "credit-card"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[color:var(--accent-bg)] focus:ring-[color:var(--accent-bg)] border-black"
                  />
                  <label htmlFor="credit-card" className="ml-2 block text-sm font-bold">
                    Credit / Debit Card
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[color:var(--accent-bg)] focus:ring-[color:var(--accent-bg)] border-black"
                  />
                  <label htmlFor="paypal" className="ml-2 block text-sm font-bold">
                    PayPal
                  </label>
                </div>
              </div>
              
              {/* In a real application, you would add card input fields here */}
              {formData.paymentMethod === "credit-card" && (
                <div className="mt-4 p-4 bg-gray-50 border-2 border-black">
                  <p className="text-sm font-bold">
                    This is a demo site. No real payment will be processed.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full border-4 border-black font-black text-lg uppercase py-3 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all ${
                  isSubmitting 
                    ? "bg-gray-500 text-white cursor-not-allowed" 
                    : "bg-black text-white hover:bg-[color:var(--accent-bg)] hover:text-black"
                }`}
              >
                {isSubmitting ? "PROCESSING..." : "PLACE ORDER"}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="border-2 border-black bg-[color:var(--accent-bg)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black mb-6 uppercase border-b-2 border-black pb-2">Order Summary</h2>
              
              <div className="divide-y-2 divide-black">
                {cart.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-3 flex">
                    <div className="flex-grow">
                      <p className="font-bold">{item.name}</p>
                      <div className="text-sm">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span> / </span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>
                      <div className="text-sm">Qty: {item.quantity}</div>
                    </div>
                    <div className="pl-4 font-bold">
                      ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t-2 border-black space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t-2 border-black pt-2 mt-2 flex justify-between font-black">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  href="/cart" 
                  className="inline-block font-bold underline hover:no-underline relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
                >
                  Return to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 