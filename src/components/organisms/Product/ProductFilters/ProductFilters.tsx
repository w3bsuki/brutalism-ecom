"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import { FilterState, ProductFiltersProps } from './types';

export function ProductFilters({
  initialFilters,
  collections,
  sizes,
  colors,
  minPrice,
  maxPrice,
  onFilterChange,
  className
}: ProductFiltersProps) {
  // Default filters state
  const defaultFilters: FilterState = {
    priceRange: [minPrice, maxPrice],
    collections: [],
    sizes: [],
    colors: []
  };

  // State for active filters
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...(initialFilters || {})
  });

  // Local state for price range slider
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange);

  // Update local price range when filters change
  useEffect(() => {
    setLocalPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  // Handle collection filter toggle
  const toggleCollection = (id: string) => {
    setFilters(prev => {
      const updatedCollections = prev.collections.includes(id)
        ? prev.collections.filter(c => c !== id)
        : [...prev.collections, id];
      
      const updatedFilters = {
        ...prev,
        collections: updatedCollections
      };
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  // Handle size filter toggle
  const toggleSize = (id: string) => {
    setFilters(prev => {
      const updatedSizes = prev.sizes.includes(id)
        ? prev.sizes.filter(s => s !== id)
        : [...prev.sizes, id];
      
      const updatedFilters = {
        ...prev,
        sizes: updatedSizes
      };
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  // Handle color filter toggle
  const toggleColor = (id: string) => {
    setFilters(prev => {
      const updatedColors = prev.colors.includes(id)
        ? prev.colors.filter(c => c !== id)
        : [...prev.colors, id];
      
      const updatedFilters = {
        ...prev,
        colors: updatedColors
      };
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  // Handle price range min change
  const handlePriceRangeMinChange = (value: number) => {
    const validValue = Math.max(minPrice, Math.min(value, localPriceRange[1]));
    setLocalPriceRange([validValue, localPriceRange[1]]);
  };

  // Handle price range max change
  const handlePriceRangeMaxChange = (value: number) => {
    const validValue = Math.max(localPriceRange[0], Math.min(value, maxPrice));
    setLocalPriceRange([localPriceRange[0], validValue]);
  };

  // Apply price range
  const applyPriceRange = () => {
    setFilters(prev => {
      const updatedFilters = {
        ...prev,
        priceRange: localPriceRange
      };
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    const resetFilters = {
      ...defaultFilters
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    filters.collections.length > 0 || 
    filters.sizes.length > 0 || 
    filters.colors.length > 0 ||
    filters.priceRange[0] > minPrice ||
    filters.priceRange[1] < maxPrice;

  return (
    <div className={cn("bg-white border-4 border-black", className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <h2 className="text-xl font-bold uppercase tracking-tight">FILTERS</h2>
        {hasActiveFilters && (
          <button 
            type="button"
            onClick={clearAllFilters}
            className="px-3 py-1 bg-white text-black font-bold text-sm uppercase hover:bg-yellow-300 transition-colors"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="p-3 border-b-4 border-black">
          <div className="flex flex-wrap gap-2">
            {filters.collections.map(id => {
              const collection = collections.find(c => c.id === id);
              return (
                <button
                  key={`active-collection-${id}`}
                  type="button"
                  onClick={() => toggleCollection(id)}
                  className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                >
                  {collection?.name || id} 
                  <X className="h-3 w-3 group-hover:text-yellow-300" />
                </button>
              );
            })}
            
            {filters.sizes.map(id => {
              const size = sizes.find(s => s.id === id);
              return (
                <button
                  key={`active-size-${id}`}
                  type="button"
                  onClick={() => toggleSize(id)}
                  className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                >
                  {size?.name || id} <X className="h-3 w-3 group-hover:text-yellow-300" />
                </button>
              );
            })}
            
            {filters.colors.map(id => {
              const color = colors.find(c => c.id === id);
              return (
                <button
                  key={`active-color-${id}`}
                  type="button"
                  onClick={() => toggleColor(id)}
                  className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                >
                  {color?.name || id} <X className="h-3 w-3 group-hover:text-yellow-300" />
                </button>
              );
            })}
            
            {(filters.priceRange[0] > minPrice || 
              filters.priceRange[1] < maxPrice) && (
              <div className="px-2 py-1 bg-black text-white text-xs font-bold uppercase">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Sections using Radix Accordion */}
      <Accordion.Root type="multiple" defaultValue={['collections', 'price', 'sizes', 'colors']} className="divide-y-4 divide-black">
        {/* Collections */}
        <AccordionItem value="collections">
          <AccordionTrigger>Collections</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {collections.map((collection) => (
                <FilterButton
                  key={`collection-${collection.id}`}
                  label={collection.name}
                  isActive={filters.collections.includes(collection.id)}
                  onClick={() => toggleCollection(collection.id)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <label htmlFor="min-price" className="block text-sm font-bold mb-1">Min Price</label>
                  <input
                    id="min-price"
                    type="number"
                    value={localPriceRange[0]}
                    min={minPrice}
                    max={localPriceRange[1]}
                    onChange={(e) => handlePriceRangeMinChange(Number(e.target.value))}
                    className="w-24 border-2 border-black p-2"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-sm font-bold mb-1">Max Price</label>
                  <input
                    id="max-price"
                    type="number"
                    value={localPriceRange[1]}
                    min={localPriceRange[0]}
                    max={maxPrice}
                    onChange={(e) => handlePriceRangeMaxChange(Number(e.target.value))}
                    className="w-24 border-2 border-black p-2"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={applyPriceRange}
                className="w-full py-2 bg-black text-white font-bold hover:bg-yellow-400 hover:text-black transition-colors"
              >
                APPLY
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sizes */}
        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <FilterButton
                  key={`size-${size.id}`}
                  label={size.name}
                  isActive={filters.sizes.includes(size.id)}
                  onClick={() => toggleSize(size.id)}
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
              {colors.map((color) => (
                <ColorButton
                  key={`color-${color.id}`}
                  color={color}
                  isActive={filters.colors.includes(color.id)}
                  onClick={() => toggleColor(color.id)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion.Root>
    </div>
  );
}

// Accordion components
function AccordionItem({ 
  children, 
  value,
  className
}: { 
  children: React.ReactNode; 
  value: string;
  className?: string;
}) {
  return (
    <Accordion.Item value={value} className={cn("", className)}>
      {children}
    </Accordion.Item>
  );
}

function AccordionTrigger({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <Accordion.Header>
      <Accordion.Trigger className={cn(
        "flex items-center justify-between w-full px-4 py-3 text-lg font-bold group",
        className
      )}>
        {children}
        <ChevronDown 
          className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" 
        />
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

function AccordionContent({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <Accordion.Content className={cn(
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden",
      className
    )}>
      <div className="p-4">{children}</div>
    </Accordion.Content>
  );
}

// Filter buttons
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
        "px-3 py-1 text-sm font-bold border-2 border-black",
        isActive 
          ? "bg-black text-white" 
          : "bg-white text-black hover:bg-gray-100"
      )}
    >
      {label}
    </button>
  );
}

function ColorButton({ 
  color, 
  isActive, 
  onClick 
}: { 
  color: { id: string; name: string; hex: string }; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1 text-sm font-bold border-2 border-black",
        isActive 
          ? "bg-black text-white" 
          : "bg-white text-black hover:bg-gray-100"
      )}
    >
      <span 
        className="inline-block w-4 h-4 border border-black"
        style={{ backgroundColor: color.hex }}
      />
      {color.name}
    </button>
  );
} 