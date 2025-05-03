import { useState, useEffect, useMemo, useCallback } from "react";
import { Product } from "@/types/product";
import { Collection } from "@/lib/types";

export interface ActiveFilters {
  collections: string[];
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: string[];
  onSale: boolean;
  inStock: boolean;
  newArrivals: boolean;
  rating: number | null;
}

export interface PriceRange {
  min: number;
  max: number;
}

export const useProductFiltering = (products: Product[], collections: Collection[]) => {
  // Calculate initial values (price range, unique sizes/colors) once
  const initialValues = useMemo(() => {
    // Default values if no products
    if (!products.length) {
      return {
        priceRange: { min: 0, max: 100 },
        uniqueSizes: [] as string[],
        uniqueColors: [] as string[],
      };
    }
    
    // Calculate actual values from product data
    const minPrice = Math.floor(Math.min(...products.map(p => p.salePrice || p.price)));
    const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));
    const uniqueSizes = [...new Set(products.flatMap(p => p.sizes))];
    const uniqueColors = [...new Set(products.flatMap(p => p.colors))];
    
    return { 
      priceRange: { min: minPrice, max: maxPrice },
      uniqueSizes,
      uniqueColors
    };
  }, [products]);
  
  // Initialize active filters with the calculated initial values
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    collections: [],
    priceRange: initialValues.priceRange,
    sizes: [],
    colors: [],
    onSale: false,
    inStock: false,
    newArrivals: false,
    rating: null,
  });
  
  // Sort option state
  const [sortOption, setSortOption] = useState("featured");
  
  // Reset price range ONLY when products change and the range values are different
  useEffect(() => {
    const isDifferent = 
      activeFilters.priceRange.min !== initialValues.priceRange.min || 
      activeFilters.priceRange.max !== initialValues.priceRange.max;
      
    if (isDifferent) {
      setActiveFilters(prev => ({
        ...prev,
        priceRange: initialValues.priceRange
      }));
    }
  }, [initialValues.priceRange]); // Only depend on initialValues.priceRange
  
  // Filter toggle handlers - memoized with useCallback to prevent unnecessary rerenders
  const toggleSaleFilter = useCallback(() => {
    setActiveFilters(prev => ({
      ...prev,
      onSale: !prev.onSale
    }));
  }, []);
  
  const toggleNewArrivalsFilter = useCallback(() => {
    setActiveFilters(prev => ({
      ...prev,
      newArrivals: !prev.newArrivals
    }));
  }, []);
  
  const toggleInStockFilter = useCallback(() => {
    setActiveFilters(prev => ({
      ...prev,
      inStock: !prev.inStock
    }));
  }, []);
  
  const setQuickCollectionFilter = useCallback((collection: Collection) => {
    setActiveFilters(prev => {
      // If already selected, remove it
      if (prev.collections.includes(collection.slug)) {
        return {
          ...prev,
          collections: prev.collections.filter(c => c !== collection.slug)
        };
      } else {
        // Otherwise add it
        return {
          ...prev,
          collections: [...prev.collections, collection.slug]
        };
      }
    });
  }, []);
  
  // Calculate if any filters are active
  const hasActiveFilters = useMemo(() => 
    activeFilters.collections.length > 0 || 
    activeFilters.sizes.length > 0 || 
    activeFilters.colors.length > 0 || 
    activeFilters.onSale || 
    activeFilters.inStock || 
    activeFilters.newArrivals ||
    activeFilters.rating !== null ||
    (initialValues.priceRange.min !== activeFilters.priceRange.min) ||
    (initialValues.priceRange.max !== activeFilters.priceRange.max),
  [activeFilters, initialValues.priceRange]);
  
  // Apply filters and sorting to get filtered products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by collection
    if (activeFilters.collections.length > 0) {
      result = result.filter(product => 
        activeFilters.collections.includes(product.collection)
      );
    }

    // Filter by price range
    result = result.filter(
      product => {
        const price = product.salePrice || product.price;
        return price >= activeFilters.priceRange.min && 
               price <= activeFilters.priceRange.max;
      }
    );

    // Filter by sizes
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => activeFilters.sizes.includes(size))
      );
    }

    // Filter by colors
    if (activeFilters.colors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => activeFilters.colors.includes(color))
      );
    }

    // Filter by on sale
    if (activeFilters.onSale) {
      result = result.filter(product => product.isSale);
    }

    // Filter by in stock
    if (activeFilters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Filter by new arrivals
    if (activeFilters.newArrivals) {
      result = result.filter(product => product.isNew);
    }
    
    // Filter by rating
    if (activeFilters.rating !== null) {
      result = result.filter(product => product.rating >= activeFilters.rating!);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        return [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case "price-high-low":
        return [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case "newest":
        return [...result].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
      case "top-rated":
        return [...result].sort((a, b) => b.rating - a.rating);
      case "best-selling":
        return [...result].sort((a, b) => b.reviewCount - a.reviewCount);
      default: // featured
        return [...result].sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
    }
  }, [activeFilters, sortOption, products]);

  return {
    filteredProducts,
    activeFilters,
    setActiveFilters,
    sortOption,
    setSortOption,
    toggleSaleFilter,
    toggleNewArrivalsFilter,
    toggleInStockFilter,
    setQuickCollectionFilter,
    hasActiveFilters,
    uniqueSizes: initialValues.uniqueSizes,
    uniqueColors: initialValues.uniqueColors,
    priceRange: initialValues.priceRange
  };
}; 