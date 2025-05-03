'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { BrutalistTextMarquee } from '@/components/organisms/BrutalistTextMarquee';
import { useEffect, useState } from 'react';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState({
    orderNumber: '',
    orderDate: '',
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    discount: 0
  });
  
  // Get order data from URL parameters
  useEffect(() => {
    const orderNumber = searchParams.get('orderNumber') || generateFallbackOrderNumber();
    const subtotal = Number(searchParams.get('subtotal') || '0');
    const shipping = Number(searchParams.get('shipping') || '0');
    const tax = Number(searchParams.get('tax') || '0');
    const total = Number(searchParams.get('total') || '0');
    const discount = Number(searchParams.get('discount') || '0');
    
    setOrderData({
      orderNumber,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      subtotal,
      shipping,
      tax,
      total,
      discount
    });
  }, [searchParams]);
  
  // Generate random order number as fallback
  const generateFallbackOrderNumber = () => {
    return `INW-${Math.floor(Math.random() * 1000000)}`;
  };
  
  return (
    <div className="bg-white">
      <BrutalistTextMarquee 
        text="🎉 ORDER CONFIRMED 🎉"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={70}
        direction="left"
      />
      
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 theme-accent-bg rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600">
            We're processing your order and will send you a confirmation email shortly.
          </p>
        </div>
        
        <div className="border-2 sm:border-3 border-black p-6 sm:p-8 bg-white mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-sm text-gray-500 uppercase">Order Number</h2>
              <p className="font-bold">{orderData.orderNumber}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500 uppercase mt-4 md:mt-0">Order Date</h2>
              <p className="font-bold">{orderData.orderDate}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500 uppercase mt-4 md:mt-0">Order Status</h2>
              <p className="font-bold text-green-600">Confirmed</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Items Subtotal</span>
                <span className="font-medium">${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${orderData.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${orderData.tax.toFixed(2)}</span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-100 text-red-600">
                  <span>Discount</span>
                  <span>-${orderData.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Shipping Address</h2>
              <div className="bg-gray-50 p-3 border-2 border-black">
                <p className="text-sm">
                  Your shipping address will be delivered to the address you provided during checkout.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Payment Method</h2>
              <div className="bg-gray-50 p-3 border-2 border-black">
                <p className="text-sm">
                  Credit Card<br />
                  **** **** **** {searchParams.get('last4') || '1234'}<br />
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border-2 border-black">
            <h3 className="font-bold mb-1">Estimated Delivery</h3>
            <p className="text-sm">
              Your order should arrive within 3-5 business days. You'll receive a shipping confirmation email with tracking information when your order ships.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-black text-white font-bold py-3 px-6 border-2 border-black theme-hover-accent transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
          >
            RETURN HOME
          </Link>
          <Link 
            href="/shop"
            className="bg-white text-black font-bold py-3 px-6 border-2 border-black hover:bg-gray-100 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
          >
            CONTINUE SHOPPING <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 