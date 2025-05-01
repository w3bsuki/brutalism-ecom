"use client";

import React from 'react';
import { useCart } from '@/hooks/use-cart';

/**
 * CartProvider component
 * 
 * A simple provider component that allows cart functionality throughout the app.
 * The actual cart state is managed by Zustand and is accessible via the useCart hook.
 * 
 * @example
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  // We're using Zustand with persistence instead of React Context,
  // so we don't need to initialize any state here
  
  return (
    <>{children}</>
  );
} 