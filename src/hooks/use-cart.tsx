"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

// Define the cart item with proper type safety
export interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  image: string;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
  maxQuantity?: number | null; // For inventory control
}

// Supported shipping methods
export type ShippingMethod = 'standard' | 'express' | 'overnight';

// Shipping rates
export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

// Promotion code details
export interface Promotion {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumOrder?: number;
}

// Define the cart store interface with enhanced functionality
export interface CartStore {
  items: CartItem[];
  taxRate: number;
  currency: string;
  selectedShippingMethod: ShippingMethod | null;
  shippingRates: ShippingRate[];
  appliedPromotion: Promotion | null;
  
  // Cart operations
  addItem: (product: Product, size: string | null, color: string | null, quantity: number) => void;
  removeItem: (id: string, size?: string | null, color?: string | null) => void;
  updateItemQuantity: (id: string, quantity: number, size?: string | null, color?: string | null) => void;
  clearCart: () => void;
  
  // Shipping operations
  setShippingMethod: (method: ShippingMethod) => void;
  getShippingCost: () => number;
  
  // Promotion operations
  applyPromotion: (code: string) => boolean;
  removePromotion: () => void;
  
  // Cart calculations
  totalItems: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  
  // Settings
  updateTaxRate: (rate: number) => void;
}

// Available shipping rates
const shippingRateOptions: ShippingRate[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery in 3-5 business days',
    price: 4.99,
    estimatedDays: '3-5'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    price: 9.99,
    estimatedDays: '2-3'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Delivery next business day',
    price: 19.99,
    estimatedDays: '1'
  }
];

// Available promotion codes - in a real app, these would be validated server-side
const availablePromotions: Promotion[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrder: 0
  },
  {
    code: 'SUMMER25',
    discountType: 'percentage',
    discountValue: 25,
    minimumOrder: 100
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 10,
    minimumOrder: 50
  }
];

// Create the enhanced cart store with zustand
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      taxRate: 0.07, // 7% tax
      currency: 'USD',
      selectedShippingMethod: 'standard',
      shippingRates: shippingRateOptions,
      appliedPromotion: null,
      
      // Add an item to the cart
      addItem: (product, selectedSize, selectedColor, quantity) => {
        // Validate input
        if (!product || !product.id) {
          console.error("Cannot add invalid product to cart");
          return;
        }
        
        set((state) => {
          try {
            // Check if we're exceeding inventory (simplified example)
            const maxQuantity = product.inStock ? 10 : 0; // In a real app, use actual inventory numbers
            
            if (!product.inStock) {
              console.error("Cannot add out-of-stock product to cart");
              return state;
            }
            
            // Find if this product with the same size and color is already in the cart
            const existingItemIndex = state.items.findIndex(
              (item) => 
                item.id === product.id && 
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
            );

            // If it exists, update quantity with inventory validation
            if (existingItemIndex !== -1) {
              const updatedItems = [...state.items];
              const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
              
              // Ensure we don't exceed inventory
              if (maxQuantity && newQuantity > maxQuantity) {
                console.warn(`Cannot add more than ${maxQuantity} of this item`);
                updatedItems[existingItemIndex].quantity = maxQuantity;
              } else {
                updatedItems[existingItemIndex].quantity = newQuantity;
              }
              
              return { items: updatedItems };
            }

            // Otherwise, add as new item with only the properties we need
            const cartItem: CartItem = {
              id: product.id,
              name: product.name || "Unknown Product",
              price: typeof product.price === 'number' ? product.price : 0,
              salePrice: typeof product.salePrice === 'number' ? product.salePrice : null,
              image: Array.isArray(product.images) && product.images.length > 0 
                ? product.images[0] 
                : "/images/hats/placeholder1.jpg",
              selectedSize,
              selectedColor,
              quantity: Math.min(quantity, maxQuantity || Infinity),
              maxQuantity
            };
            
            return { items: [...state.items, cartItem] };
          } catch (err) {
            console.error("Error adding item to cart:", err);
            return state; // Return unchanged state on error
          }
        });
      },
      
      // Remove an item from the cart
      removeItem: (id, size = null, color = null) =>
        set((state) => {
          // If size and color are provided, only remove that specific variant
          if (size !== undefined && color !== undefined) {
            return {
              items: state.items.filter(
                (item) => 
                  !(item.id === id && 
                    item.selectedSize === size && 
                    item.selectedColor === color)
              ),
            };
          }
          
          // Otherwise, remove all items with this ID
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        }),
      
      // Update the quantity of an item
      updateItemQuantity: (id, quantity, size = null, color = null) =>
        set((state) => {
          return {
            items: state.items.map((item) => {
              // Only update if this is the specific item variant
              if (
                item.id === id && 
                (size === undefined || item.selectedSize === size) && 
                (color === undefined || item.selectedColor === color)
              ) {
                // Ensure we don't exceed inventory or go below 1
                const validQuantity = Math.max(1, item.maxQuantity 
                  ? Math.min(quantity, item.maxQuantity) 
                  : quantity);
                
                return { ...item, quantity: validQuantity };
              }
              return item;
            }),
          };
        }),
      
      // Clear the entire cart
      clearCart: () => set({ items: [], appliedPromotion: null }),
      
      // Set shipping method
      setShippingMethod: (method) => set({ selectedShippingMethod: method }),
      
      // Get shipping cost based on selected method
      getShippingCost: () => {
        const { selectedShippingMethod, shippingRates, subtotal, appliedPromotion } = get();
        
        // If we have a free shipping promotion and meet the minimum
        if (
          appliedPromotion && 
          appliedPromotion.code === 'FREESHIP' && 
          (!appliedPromotion.minimumOrder || subtotal >= appliedPromotion.minimumOrder)
        ) {
          return 0;
        }
        
        // Otherwise, calculate based on selected method
        const shippingRate = shippingRates.find(rate => rate.id === selectedShippingMethod);
        return shippingRate ? shippingRate.price : 0;
      },
      
      // Apply a promotion code
      applyPromotion: (code) => {
        const promotion = availablePromotions.find(
          p => p.code.toLowerCase() === code.toLowerCase()
        );
        
        if (!promotion) {
          return false;
        }
        
        // Check minimum order if applicable
        if (promotion.minimumOrder && get().subtotal < promotion.minimumOrder) {
          return false;
        }
        
        set({ appliedPromotion: promotion });
        return true;
      },
      
      // Remove promotion
      removePromotion: () => set({ appliedPromotion: null }),
      
      // Update tax rate
      updateTaxRate: (rate) => set({ taxRate: rate }),
      
      // Calculate the total number of items
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Calculate the subtotal
      get subtotal() {
        return get().items.reduce((total, item) => {
          try {
            // Use sale price if available, otherwise regular price
            const price = item.salePrice ? item.salePrice : item.price;
            return total + (price * item.quantity);
          } catch (err) {
            console.error("Error calculating subtotal for item:", item, err);
            return total;
          }
        }, 0);
      },
      
      // Calculate tax
      get tax() {
        return Math.round(get().subtotal * get().taxRate * 100) / 100;
      },
      
      // Calculate discount
      get discount() {
        const { subtotal, appliedPromotion } = get();
        
        if (!appliedPromotion) {
          return 0;
        }
        
        if (appliedPromotion.discountType === 'percentage') {
          return Math.round(subtotal * (appliedPromotion.discountValue / 100) * 100) / 100;
        } else {
          return Math.min(subtotal, appliedPromotion.discountValue);
        }
      },
      
      // Calculate total
      get total() {
        const { subtotal, tax, discount } = get();
        const shippingCost = get().getShippingCost();
        
        return Math.max(0, subtotal + tax + shippingCost - discount);
      }
    }),
    {
      name: "cart-storage",
      version: 2, // Increment this if the storage format changes
      migrate: (persistedState, version) => {
        // Handle migration from earlier versions
        if (version === 0 || version === 1) {
          // For version 0 or 1, reset to empty cart to avoid migration issues
          return {
            items: [],
            taxRate: 0.07,
            currency: 'USD',
            selectedShippingMethod: 'standard',
            shippingRates: shippingRateOptions,
            appliedPromotion: null
          };
        }
        return persistedState as CartStore;
      }
    }
  )
); 