"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string>("");
  
  useEffect(() => {
    // Generate a random order number for demo purposes
    const randomOrderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrderNum);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-black mb-8 relative inline-block after:content-[''] after:block after:w-full after:h-1 after:bg-[color:var(--accent-bg)] after:mt-2">
        ORDER CONFIRMATION
      </h1>
      
      <div className="border-2 border-black bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 p-3 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-black mb-4 text-center uppercase">Thank You for Your Order!</h2>
        
        <p className="text-gray-800 mb-8 text-center font-bold">
          Your order has been received and is being processed. You will receive an email confirmation shortly.
        </p>
        
        {orderNumber && (
          <div className="bg-[color:var(--accent-bg)] p-4 border-2 border-black mb-8 inline-block mx-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full text-center">
            <p className="text-sm font-bold uppercase">Order Number</p>
            <p className="font-mono text-xl font-black">{orderNumber}</p>
          </div>
        )}
        
        <div className="mb-8">
          <h3 className="text-xl font-black mb-4 uppercase relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-[color:var(--accent-bg)] after:mt-1">What's Next?</h3>
          <ul className="space-y-2 border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <li className="flex items-start">
              <div className="mr-2 text-black min-w-6 h-6 w-6 bg-[color:var(--accent-bg)] rounded-full flex items-center justify-center border-2 border-black font-black">✓</div>
              <span className="font-bold">You'll receive an order confirmation email with details of your purchase</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 text-black min-w-6 h-6 w-6 bg-[color:var(--accent-bg)] rounded-full flex items-center justify-center border-2 border-black font-black">✓</div>
              <span className="font-bold">Your order will be processed and prepared for shipping</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 text-black min-w-6 h-6 w-6 bg-[color:var(--accent-bg)] rounded-full flex items-center justify-center border-2 border-black font-black">✓</div>
              <span className="font-bold">You'll receive a shipping notification once your order is on its way</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/shop" 
            className="px-6 py-3 bg-black text-white border-2 border-black font-bold hover:bg-[color:var(--accent-bg)] hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center uppercase"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="px-6 py-3 bg-white border-2 border-black font-bold hover:bg-[color:var(--accent-bg)] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center uppercase"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 