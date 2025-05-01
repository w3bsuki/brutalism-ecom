"use client";

import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface RecentlyViewedStore {
  products: Product[];
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

const MAX_RECENTLY_VIEWED = 8;

// Create a Zustand store for recently viewed products
export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      products: [],
      
      // Add a product to recently viewed
      addProduct: (product) => {
        if (!product) return;
        
        set((state) => {
          // Filter out the product if it's already in the list (to reorder)
          const filteredProducts = state.products.filter(p => p.id !== product.id);
          
          // Add the new product at the beginning of the array
          const updatedProducts = [product, ...filteredProducts].slice(0, MAX_RECENTLY_VIEWED);
          
          return { products: updatedProducts };
        });
      },
      
      // Clear all recently viewed products
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: "recently-viewed-storage",
      version: 1, // Increment this if the storage format changes
    }
  )
);

// React hook wrapper for functional components
export function useRecentlyViewed() {
  const [mounted, setMounted] = useState(false);
  const { products, addProduct, clearProducts } = useRecentlyViewedStore();
  
  // Ensure hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return {
    products: mounted ? products : [],
    addProduct,
    clearProducts,
  };
} 