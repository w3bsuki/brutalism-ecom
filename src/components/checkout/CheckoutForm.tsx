"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { CheckCircle, ArrowRight, Truck, AlertCircle } from "lucide-react";
import { submitOrder, generateOrderNumber } from "@/lib/orderService";

type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation';

export function CheckoutForm() {
  const router = useRouter();
  const cart = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phoneNumber: "",
    saveInfo: true,
  });
  
  // For payment details (in a real app, these would be handled by a payment processor)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
  });
  
  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  // Payment form handling
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };
  
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
  
  // Process and submit order to Supabase
  const processOrder = async () => {
    try {
      setOrderSubmitting(true);
      setOrderError("");
      
      // Generate an order number
      const orderNumber = generateOrderNumber();
      
      // Last 4 digits of card number for reference (in real app, use a payment processor)
      const last4 = paymentData.cardNumber.slice(-4);
      const cardDisplay = `**** **** **** ${last4}`;
      
      // Format address for storage
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phoneNumber: formData.phoneNumber
      };
      
      // Prepare order data
      const orderData = {
        userEmail: formData.email,
        orderNumber,
        total: cart.total,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shippingCost: cart.getShippingCost(),
        discount: cart.discount,
        items: cart.items,
        shippingAddress,
        paymentMethod: cardDisplay
      };
      
      // Submit order to Supabase
      const { success, error } = await submitOrder(orderData);
      
      if (!success) {
        throw new Error(error?.message || "Failed to submit order");
      }
      
      // Clear cart after successful checkout
      cart.clearCart();
      
      // Redirect to confirmation page with order data in URL parameters
      const params = new URLSearchParams({
        orderNumber: orderNumber,
        subtotal: cart.subtotal.toString(),
        shipping: cart.getShippingCost().toString(),
        tax: cart.tax.toString(),
        total: cart.total.toString(),
        discount: cart.discount.toString(),
        last4: last4
      });
      
      router.push(`/checkout/confirmation?${params.toString()}`);
      
    } catch (err: any) {
      console.error("Error processing order:", err);
      setOrderError(err?.message || "An error occurred while processing your order");
      setOrderSubmitting(false);
    }
  };
  
  // Progress to next step
  const handleContinue = async () => {
    if (currentStep === 'information') {
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      // Process payment and submit order
      await processOrder();
    }
  };
  
  // Check if current step is complete
  const isStepComplete = (): boolean => {
    if (currentStep === 'information') {
      return !!(
        formData.email && 
        formData.firstName && 
        formData.lastName && 
        formData.address && 
        formData.city && 
        formData.state && 
        formData.zipCode
      );
    }
    
    if (currentStep === 'shipping') {
      return true; // Always complete as we have default shipping option
    }
    
    if (currentStep === 'payment') {
      return !!(
        paymentData.cardNumber && 
        paymentData.nameOnCard && 
        paymentData.expiryDate && 
        paymentData.cvv
      );
    }
    
    return false;
  };
  
  // If cart is empty, redirect to cart page
  if (cart.items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-gray-50 border-2 sm:border-3 border-black p-6 sm:p-8 text-center max-w-md w-full">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-black text-white py-3 px-6 font-bold border-2 border-black theme-hover-accent transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-full"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }
  
  // Confirmation step
  if (currentStep === 'confirmation') {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-white border-2 sm:border-3 border-black p-6 sm:p-8 text-center max-w-md w-full">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 theme-accent-bg rounded-full">
            <CheckCircle className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-6">Your order number is: <span className="font-bold">{Math.floor(Math.random() * 1000000)}</span></p>
          
          <div className="text-left bg-gray-50 p-4 border-2 border-black mb-6">
            <h3 className="font-bold mb-2">Order Summary</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Items ({cart.totalItems}):</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${cart.getShippingCost().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span>-${cart.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white py-3 px-6 font-bold border-2 border-black theme-hover-accent transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex-1"
            >
              GO HOME
            </button>
            <button
              onClick={() => router.push("/shop")}
              className="bg-white text-black py-3 px-6 font-bold border-2 border-black hover:bg-gray-100 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex-1"
            >
              SHOP MORE
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Checkout steps */}
      <div className="flex justify-between mb-8 border-b-2 border-black pb-4">
        <div className={`flex items-center ${currentStep === 'information' ? 'text-black font-bold' : 'text-gray-500'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
            currentStep === 'information' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            1
          </div>
          Information
        </div>
        <div className={`flex items-center ${currentStep === 'shipping' ? 'text-black font-bold' : 'text-gray-500'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
            currentStep === 'shipping' ? 'bg-black text-white' : currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            2
          </div>
          Shipping
        </div>
        <div className={`flex items-center ${currentStep === 'payment' ? 'text-black font-bold' : 'text-gray-500'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
            currentStep === 'payment' ? 'bg-black text-white' : currentStep === 'confirmation' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            3
          </div>
          Payment
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form section */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 sm:border-3 border-black p-6">
            {/* Information step */}
            {currentStep === 'information' && (
              <div>
                <h2 className="text-xl font-bold mb-6 uppercase">Contact Information</h2>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                  />
                </div>
                
                <h2 className="text-xl font-bold my-6 uppercase">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="country" className="block text-sm font-medium mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleChange}
                      className="mr-2 h-5 w-5 border-2 border-black"
                    />
                    <span className="text-sm">Save this information for next time</span>
                  </label>
                </div>
              </div>
            )}
            
            {/* Shipping step */}
            {currentStep === 'shipping' && (
              <div>
                <h2 className="text-xl font-bold mb-6 uppercase">Shipping Method</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.shippingRates.map((rate) => (
                    <label 
                      key={rate.id} 
                      className={`flex items-center justify-between p-4 border-2 ${
                        cart.selectedShippingMethod === rate.id 
                          ? 'border-black theme-accent-bg' 
                          : 'border-gray-300'
                      } cursor-pointer`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={rate.id}
                          checked={cart.selectedShippingMethod === rate.id}
                          onChange={() => cart.setShippingMethod(rate.id as any)}
                          className="mr-3 h-5 w-5"
                        />
                        <div>
                          <div className="font-bold">{rate.name}</div>
                          <div className="text-sm text-gray-500">{rate.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-2" />
                        <span className="font-bold">${rate.price.toFixed(2)}</span>
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-4 border-2 border-black mb-6">
                  <h3 className="font-bold mb-2">Shipping Address</h3>
                  <div className="text-sm">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.country}</p>
                    {formData.phoneNumber && <p>{formData.phoneNumber}</p>}
                  </div>
                  <button 
                    onClick={() => setCurrentStep('information')}
                    className="text-sm underline mt-2"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
            
            {/* Payment step */}
            {currentStep === 'payment' && (
              <div>
                <h2 className="text-xl font-bold mb-6 uppercase">Payment Method</h2>
                
                <div className="mb-6">
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">
                    Name on Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={paymentData.nameOnCard}
                    onChange={handlePaymentChange}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      required
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                      Security Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      required
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:theme-accent-bg"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-2 border-black mb-2">
                  <h3 className="font-bold mb-2">Billing Address</h3>
                  <p className="text-sm">Same as shipping address</p>
                </div>
                
                <p className="text-sm text-gray-500 mb-6">
                  Your payment information is encrypted and secure. We never store your full card details.
                </p>
              </div>
            )}
            
            <div className="flex justify-between pt-4 border-t-2 border-black">
              {currentStep !== 'information' ? (
                <button
                  onClick={() => setCurrentStep(currentStep === 'payment' ? 'shipping' : 'information')}
                  className="px-4 py-2 text-sm font-bold underline flex items-center"
                >
                  ← Back
                </button>
              ) : (
                <button
                  onClick={() => router.push("/cart")}
                  className="px-4 py-2 text-sm font-bold underline flex items-center"
                >
                  ← Back to cart
                </button>
              )}
              
              <div className="mt-8">
                {orderError && (
                  <div className="mb-4 p-3 border-2 border-red-500 bg-red-50 text-red-600">
                    {orderError}
                  </div>
                )}
                <button
                  onClick={handleContinue}
                  disabled={!isStepComplete() || orderSubmitting}
                  className={`w-full bg-black text-white py-3 px-6 font-bold flex items-center justify-center ${
                    !isStepComplete() ? "opacity-50 cursor-not-allowed" : "theme-hover-accent"
                  } transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                >
                  {orderSubmitting ? (
                    <>PROCESSING...</>
                  ) : (
                    <>PLACE ORDER<ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 sm:border-3 border-black p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 uppercase">Order Summary</h2>
            
            <div className="max-h-64 overflow-y-auto mb-4">
              {cart.items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex mb-4 pb-4 border-b border-gray-200">
                  <div className="h-16 w-16 flex-shrink-0 bg-gray-100 border-2 border-black relative mr-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="object-cover absolute inset-0 h-full w-full"
                    />
                    <div className="absolute -top-2 -right-2 h-5 w-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold leading-tight">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' / '}
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                    </div>
                    <div className="font-bold mt-1">
                      {item.salePrice ? (
                        <>
                          <span className="text-red-600">${item.salePrice.toFixed(2)}</span>
                          <span className="text-gray-500 text-xs line-through ml-1">${item.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>${item.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Promo code */}
            <div className="mb-4 pb-4 border-b-2 border-black">
              <label htmlFor="promoCode" className="block text-sm font-medium mb-1">
                Promotion Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-r-0 border-black focus:outline-none focus:theme-accent-bg"
                  placeholder="Enter code"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-black text-white px-3 py-2 font-bold border-2 border-black theme-hover-accent transition-colors"
                >
                  APPLY
                </button>
              </div>
              {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
              {cart.appliedPromotion && (
                <div className="flex items-center justify-between mt-2 text-green-600 text-sm">
                  <span>
                    <CheckCircle className="inline-block h-4 w-4 mr-1" />
                    {cart.appliedPromotion.code} applied
                  </span>
                  <button
                    onClick={() => cart.removePromotion()}
                    className="text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            
            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${cart.getShippingCost().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              
              {cart.discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount</span>
                  <span>-${cart.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-black">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 