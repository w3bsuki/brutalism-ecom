"use client";

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';

const STORAGE_KEY = 'recently-viewed-products';
const MAX_PRODUCTS = 10;

export interface UseRecentlyViewedReturn {
  products: Product[];
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

export function useRecentlyViewed(): UseRecentlyViewedReturn {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error('Error loading recently viewed products from localStorage:', error);
    }
  }, []);

  // Add product to recently viewed
  const addProduct = useCallback((product: Product) => {
    if (!product) return;
    
    setProducts((prevProducts) => {
      // Remove product if it already exists (to move it to the front)
      const filteredProducts = prevProducts.filter((p) => p.id !== product.id);
      
      // Add the new product to the beginning of the array
      const newProducts = [product, ...filteredProducts].slice(0, MAX_PRODUCTS);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
      } catch (error) {
        console.error('Error saving recently viewed products to localStorage:', error);
      }
      
      return newProducts;
    });
  }, []);

  // Clear all recently viewed products
  const clearProducts = useCallback(() => {
    setProducts([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error removing recently viewed products from localStorage:', error);
    }
  }, []);

  return { products, addProduct, clearProducts };
} 