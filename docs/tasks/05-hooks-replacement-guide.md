# Hooks Replacement Guide for Medusa.js Integration

This document provides a detailed guide for replacing our current client-side hooks with Medusa.js-compatible implementations. It identifies all hooks used in the application, their current usage patterns, and how they should be refactored to work with Medusa.

## Current Hooks Overview

Our Brutalist E-commerce site currently uses several custom hooks for state management:

1. **useCart** - Manages shopping cart functionality
2. **useWishlist** - Manages wishlist functionality
3. **useProductFiltering** - Handles product filtering operations
4. **useRecentlyViewed** - Tracks recently viewed products

## Replacement Strategy

### 1. useCart → useMedusaCart

**Current Implementation:**
- Located at: `src/hooks/use-cart.tsx`
- Uses Zustand for state management
- Used by 10+ components including:
  - `ProductQuickView.tsx`
  - `ProductCard.tsx`
  - `BrutalistTrendingCarousel.tsx`
  - `BrutalistNavbar.tsx`
  - `CheckoutForm.tsx`
  - `cart/page.tsx`
  - `product/[slug]/page.tsx`
  - `CartProvider.tsx`

**Current Usage Pattern:**
```tsx
const { addItem, removeItem, updateItemQuantity, items, totalItems, subtotal, total } = useCart();
```

**Replacement Implementation:**
- Create new hook at: `src/hooks/use-medusa-cart.ts`
- Use React state and Medusa client
- Provide identical API to existing hook for seamless transition
- For implementation details, see: `docs/tasks/04-medusa-integration-plan.md`

**Import Updates Needed:**
```tsx
// Change from:
import { useCart } from "@/hooks/use-cart";

// To:
import { useMedusaCart as useCart } from "@/hooks/use-medusa-cart";
```

### 2. useWishlist → useMedusaWishlist

**Current Implementation:**
- Located at: `src/hooks/use-wishlist.tsx`
- Uses Zustand and localStorage
- Used in:
  - `BrutalistNavbar.tsx` 
  - `wishlist/page.tsx`

**Current Usage Pattern:**
```tsx
const { items, addItem, removeItem, clearWishlist } = useWishlist();
```

**Replacement Implementation:**
- Create new hook at: `src/hooks/use-medusa-wishlist.ts`
- Use React state and custom Medusa entity (requires backend customization)
- Example implementation:

```tsx
import { useState, useEffect } from 'react';
import medusaClient from '@/lib/medusa-client';

export function useMedusaWishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      try {
        // This endpoint will need to be created as a custom route in Medusa
        const { wishlist } = await medusaClient.custom.get('/store/customers/me/wishlist');
        setItems(wishlist.items || []);
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadWishlist();
  }, []);
  
  const addItem = async (productId) => {
    try {
      // Custom endpoint to add item to wishlist
      const { wishlist } = await medusaClient.custom.post('/store/customers/me/wishlist', {
        product_id: productId
      });
      setItems(wishlist.items);
      return wishlist;
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      throw error;
    }
  };
  
  const removeItem = async (itemId) => {
    try {
      // Custom endpoint to remove item from wishlist
      const { wishlist } = await medusaClient.custom.delete(`/store/customers/me/wishlist/${itemId}`);
      setItems(wishlist.items);
      return wishlist;
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      throw error;
    }
  };
  
  const clearWishlist = async () => {
    try {
      // Custom endpoint to clear wishlist
      const { wishlist } = await medusaClient.custom.delete('/store/customers/me/wishlist');
      setItems([]);
      return wishlist;
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      throw error;
    }
  };
  
  return {
    items,
    addItem,
    removeItem,
    clearWishlist,
    loading
  };
}
```

### 3. useProductFiltering

**Current Implementation:**
- Logic for sorting, filtering, and pagination of products
- Will need to be adapted to work with Medusa's query parameters

**Replacement Approach:**
- Transform filter options into Medusa-compatible query parameters
- Map category filters to collection filters in Medusa
- Map price range filters to Medusa's min/max price filters
- Adapt sorting to use Medusa's supported sorting options

**Example Implementation:**
```tsx
import { useState, useEffect } from 'react';
import medusaClient from '@/lib/medusa-client';

export function useMedusaProductFiltering({
  initialFilters = {},
  initialSort = "created_at",
  initialPage = 1,
  pageSize = 12
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        // Convert our filters to Medusa format
        const queryParams = {
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          order: sort,
          ...transformFilters(filters)
        };
        
        const { products, count } = await medusaClient.products.list(queryParams);
        
        setProducts(products);
        setCount(count);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters, sort, currentPage, pageSize]);
  
  // Transform our filter format to Medusa's query parameters
  const transformFilters = (filters) => {
    const result = {};
    
    if (filters.category) {
      result.collection_id = filters.category;
    }
    
    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) {
        result.price_list_id = []; // Set appropriate price list if applicable
        result.price = { gt: filters.priceRange.min * 100 }; // Convert to cents
      }
      if (filters.priceRange.max !== undefined) {
        result.price = { 
          ...result.price,
          lt: filters.priceRange.max * 100 // Convert to cents
        };
      }
    }
    
    // Add other filter transformations as needed
    return result;
  };
  
  return {
    products,
    count,
    loading,
    filters,
    setFilters,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages: Math.ceil(count / pageSize)
  };
}
```

### 4. useRecentlyViewed

**Current Implementation:**
- Tracks products that the user has recently viewed
- Likely uses localStorage

**Replacement Approach:**
- Can be kept mostly as-is since this is primarily client-side functionality
- If desired, could be enhanced to sync with Medusa customer data when logged in

## Register Hooks Utility

The `src/lib/register-hooks.ts` file that currently makes hooks available globally will need to be updated:

**Current Implementation:**
```tsx
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

declare global {
  interface Window {
    useCart: typeof useCart;
    useWishlist: typeof useWishlist;
  }
}

export function registerHooks() {
  window.useCart = useCart;
  window.useWishlist = useWishlist;
}
```

**Updated Implementation:**
```tsx
import { useMedusaCart } from "@/hooks/use-medusa-cart";
import { useMedusaWishlist } from "@/hooks/use-medusa-wishlist";

declare global {
  interface Window {
    useCart: typeof useMedusaCart;
    useWishlist: typeof useMedusaWishlist;
  }
}

export function registerHooks() {
  window.useCart = useMedusaCart;
  window.useWishlist = useMedusaWishlist;
}
```

## Implementation Plan

1. **Phase 1: Create New Hooks**
   - Implement `useMedusaCart` hook
   - Implement `useMedusaWishlist` hook
   - Create/update helper hooks for product filtering

2. **Phase 2: Testing**
   - Test each hook in isolation
   - Create test components to verify functionality
   - Compare behavior to existing hooks

3. **Phase 3: Component Updates**
   - Systematically update components to use new hooks
   - Focus on one hook at a time across all components
   - Verify functionality after each component is updated

4. **Phase 4: Cleanup**
   - Remove old hook implementations
   - Update any documentation
   - Remove unused code

## Migration Impact Assessment

| Component | Hooks Used | Migration Complexity |
|-----------|------------|----------------------|
| ProductCard | useCart | Low |
| ProductQuickView | useCart | Low |
| BrutalistNavbar | useCart, useWishlist | Medium |
| Cart page | useCart | Medium |
| Wishlist page | useCart, useWishlist | Medium |
| Product page | useCart | Medium |
| Product listing | useProductFiltering | High |

## Fallback Plan

In case of issues during migration, we can:

1. Keep the original hooks but modify them to proxy to Medusa hooks
2. Create a toggle feature to switch between implementations
3. Roll back to the original implementation if major issues are encountered 