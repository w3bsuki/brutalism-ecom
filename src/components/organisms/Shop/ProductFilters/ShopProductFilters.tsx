"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import { ShopProductFiltersProps } from './types';

/**
 * ShopProductFilters - Component for filtering products in the shop page
 * 
 * Provides UI for filtering products by collections, price range, sizes, colors,
 * and boolean filters like "on sale", "in stock", and "new arrivals".
 */
export function ShopProductFilters({
  collections,
  priceRange,
  sizes,
  colors,
  activeFilters,
  setActiveFilters,
  className
}: ShopProductFiltersProps) {
  // Local min/max for price slider
  const [localPriceRange, setLocalPriceRange] = useState({
    min: activeFilters.priceRange.min,
    max: activeFilters.priceRange.max
  });

  // Update local price range when activeFilters change
  useEffect(() => {
    setLocalPriceRange({
      min: activeFilters.priceRange.min,
      max: activeFilters.priceRange.max
    });
  }, [activeFilters.priceRange]);

  // Handle collection filter toggle
  const toggleCollection = (slug: string) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated.collections.includes(slug)) {
        updated.collections = updated.collections.filter(c => c !== slug);
      } else {
        updated.collections = [...updated.collections, slug];
      }
      return updated;
    });
  };

  // Handle size filter toggle
  const toggleSize = (size: string) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated.sizes.includes(size)) {
        updated.sizes = updated.sizes.filter(s => s !== size);
      } else {
        updated.sizes = [...updated.sizes, size];
      }
      return updated;
    });
  };

  // Handle color filter toggle
  const toggleColor = (color: string) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated.colors.includes(color)) {
        updated.colors = updated.colors.filter(c => c !== color);
      } else {
        updated.colors = [...updated.colors, color];
      }
      return updated;
    });
  };

  // Handle boolean filter toggle
  const toggleBooleanFilter = (filter: 'onSale' | 'inStock' | 'newArrivals') => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  // Handle price range change
  const handlePriceRangeMinChange = (value: number) => {
    const validValue = Math.max(priceRange.min, Math.min(value, localPriceRange.max));
    setLocalPriceRange(prev => ({ ...prev, min: validValue }));
  };

  const handlePriceRangeMaxChange = (value: number) => {
    const validValue = Math.max(localPriceRange.min, Math.min(value, priceRange.max));
    setLocalPriceRange(prev => ({ ...prev, max: validValue }));
  };

  // Apply price range
  const applyPriceRange = () => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: {
        min: localPriceRange.min,
        max: localPriceRange.max
      }
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      collections: [],
      priceRange: { min: priceRange.min, max: priceRange.max },
      sizes: [],
      colors: [],
      onSale: false,
      inStock: false,
      newArrivals: false,
    });
  };

  // Check if any filters are active
  const hasActiveFilters = 
    activeFilters.collections.length > 0 || 
    activeFilters.sizes.length > 0 || 
    activeFilters.colors.length > 0 || 
    activeFilters.onSale || 
    activeFilters.inStock || 
    activeFilters.newArrivals ||
    activeFilters.priceRange.min > priceRange.min ||
    activeFilters.priceRange.max < priceRange.max;

  return (
    <div className={cn("bg-white border-2 border-black", className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <h2 className="text-xl font-bold uppercase tracking-tight">FILTERS</h2>
        {hasActiveFilters && (
          <button 
            type="button"
            onClick={clearAllFilters}
            className="px-3 py-1 bg-white text-black font-bold text-sm uppercase hover:bg-yellow-300 transition-colors"
            aria-label="Clear all filters"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="p-3 border-b-2 border-black">
          <div className="flex flex-wrap gap-2">
            {activeFilters.collections.map(slug => {
              const collection = collections.find(c => c.slug === slug);
              return (
                <button
                  key={`active-collection-${slug}`}
                  type="button"
                  onClick={() => toggleCollection(slug)}
                  className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                  aria-label={`Remove ${collection?.name || slug} filter`}
                >
                  {collection?.name || slug} 
                  <X className="h-3 w-3 group-hover:text-yellow-300" />
                </button>
              );
            })}
            
            {activeFilters.sizes.map(size => (
              <button
                key={`active-size-${size}`}
                type="button"
                onClick={() => toggleSize(size)}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                aria-label={`Remove ${size} size filter`}
              >
                {size} <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            ))}
            
            {activeFilters.colors.map(color => (
              <button
                key={`active-color-${color}`}
                type="button"
                onClick={() => toggleColor(color)}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                aria-label={`Remove ${color} color filter`}
              >
                {color} <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            ))}

            {activeFilters.onSale && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('onSale')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                aria-label="Remove on sale filter"
              >
                ON SALE <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            )}
            
            {activeFilters.inStock && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('inStock')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                aria-label="Remove in stock filter"
              >
                IN STOCK <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            )}
            
            {activeFilters.newArrivals && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('newArrivals')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                aria-label="Remove new arrivals filter"
              >
                NEW ARRIVALS <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            )}
            
            {(activeFilters.priceRange.min > priceRange.min || activeFilters.priceRange.max < priceRange.max) && (
              <button
                type="button"
                onClick={() => {
                  setActiveFilters(prev => ({
                    ...prev,
                    priceRange: { min: priceRange.min, max: priceRange.max }
                  }));
                }}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                aria-label="Reset price range filter"
              >
                ${activeFilters.priceRange.min} - ${activeFilters.priceRange.max} <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Filter Accordion */}
      <Accordion.Root type="multiple" defaultValue={['collections', 'price', 'sizes', 'colors', 'other']} className="divide-y-2 divide-black">
        {/* Collections */}
        <AccordionItem value="collections">
          <AccordionTrigger>Collections</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {collections.map(collection => (
                <FilterButton
                  key={`collection-${collection.slug}`}
                  label={collection.name}
                  isActive={activeFilters.collections.includes(collection.slug)}
                  onClick={() => toggleCollection(collection.slug)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-1 py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label htmlFor="min-price" className="block text-sm font-bold mb-1">
                    Min Price
                  </label>
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <input
                      id="min-price"
                      type="number"
                      min={priceRange.min}
                      max={localPriceRange.max}
                      value={localPriceRange.min}
                      onChange={(e) => handlePriceRangeMinChange(parseInt(e.target.value))}
                      className="w-24 border-2 border-black py-1 px-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-sm font-bold mb-1">
                    Max Price
                  </label>
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <input
                      id="max-price"
                      type="number"
                      min={localPriceRange.min}
                      max={priceRange.max}
                      value={localPriceRange.max}
                      onChange={(e) => handlePriceRangeMaxChange(parseInt(e.target.value))}
                      className="w-24 border-2 border-black py-1 px-2 text-sm"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={applyPriceRange}
                className="w-full py-2 bg-black text-white font-bold uppercase text-sm hover:bg-yellow-300 hover:text-black transition-colors"
              >
                Apply Price Range
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sizes */}
        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <FilterButton
                  key={`size-${size}`}
                  label={size}
                  isActive={activeFilters.sizes.includes(size)}
                  onClick={() => toggleSize(size)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <FilterButton
                  key={`color-${color}`}
                  label={color}
                  isActive={activeFilters.colors.includes(color)}
                  onClick={() => toggleColor(color)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Other Filters */}
        <AccordionItem value="other">
          <AccordionTrigger>Other Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <FilterButton
                label="On Sale"
                isActive={activeFilters.onSale}
                onClick={() => toggleBooleanFilter('onSale')}
              />
              <FilterButton
                label="In Stock"
                isActive={activeFilters.inStock}
                onClick={() => toggleBooleanFilter('inStock')}
              />
              <FilterButton
                label="New Arrivals"
                isActive={activeFilters.newArrivals}
                onClick={() => toggleBooleanFilter('newArrivals')}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion.Root>
    </div>
  );
}

/**
 * AccordionItem component for consistent styling
 */
function AccordionItem({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <Accordion.Item value={value} className="border-0">
      {children}
    </Accordion.Item>
  );
}

/**
 * AccordionTrigger component for consistent styling
 */
function AccordionTrigger({ children }: { children: React.ReactNode }) {
  return (
    <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 font-bold text-lg focus:outline-none hover:bg-gray-100">
      {children}
      <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
  );
}

/**
 * AccordionContent component for consistent styling
 */
function AccordionContent({ children }: { children: React.ReactNode }) {
  return (
    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      <div className="px-4 py-3">{children}</div>
    </Accordion.Content>
  );
}

/**
 * FilterButton component for consistent styling
 */
function FilterButton({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "py-1 px-3 text-sm font-bold border-2 border-black",
        isActive
          ? "bg-black text-white"
          : "bg-white text-black hover:bg-yellow-300 transition-colors"
      )}
    >
      {label}
    </button>
  );
} 