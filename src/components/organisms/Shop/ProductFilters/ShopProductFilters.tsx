"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Star, Search, Tag, Zap, Shield, Check } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Slider from '@radix-ui/react-slider';
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
  // Local state for price range
  const [localPriceRange, setLocalPriceRange] = useState({
    min: activeFilters.priceRange.min,
    max: activeFilters.priceRange.max
  });
  
  // State for search query within filters
  const [searchQuery, setSearchQuery] = useState("");
  // Ref for searching inside the filter panel
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Handle slider price range change
  const handleSliderChange = (values: number[]) => {
    if (values.length === 2) {
      setLocalPriceRange({
        min: values[0],
        max: values[1]
      });
    }
  };

  // Apply price range when slider stops
  const applyPriceRange = () => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: {
        min: localPriceRange.min,
        max: localPriceRange.max
      }
    }));
  };

  // Handle rating filter
  const toggleRatingFilter = (rating: number) => {
    setActiveFilters(prev => {
      // If we have a rating and it's the same as current, clear it
      if (prev.rating === rating) {
        return { ...prev, rating: null };
      }
      // Otherwise set the new rating
      return { ...prev, rating };
    });
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
      rating: null,
    });
  };

  // Filter collections, sizes, and colors by search query
  const filteredCollections = collections.filter(c => 
    searchQuery ? c.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  
  const filteredSizes = sizes.filter(s => 
    searchQuery ? s.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  
  const filteredColors = colors.filter(c => 
    searchQuery ? c.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  // Check if any filters are active
  const hasActiveFilters = 
    activeFilters.collections.length > 0 || 
    activeFilters.sizes.length > 0 || 
    activeFilters.colors.length > 0 || 
    activeFilters.onSale || 
    activeFilters.inStock || 
    activeFilters.newArrivals ||
    activeFilters.rating !== null ||
    activeFilters.priceRange.min > priceRange.min ||
    activeFilters.priceRange.max < priceRange.max;

  return (
    <div className={cn("bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <h2 className="text-lg font-bold uppercase tracking-tight">FILTER PRODUCTS</h2>
        {hasActiveFilters && (
          <button 
            type="button"
            onClick={clearAllFilters}
            className="px-3 py-1 theme-accent-bg text-black font-bold text-xs uppercase hover:brightness-95 transition-all"
            aria-label="Clear all filters"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Filter Search */}
      <div className="p-3 border-b-2 border-black">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search filters..."
            className="w-full pl-10 pr-4 py-2 border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          {searchQuery && (
            <button
              type="button" 
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-black" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="p-3 border-b-2 border-black bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {activeFilters.collections.map(slug => {
              const collection = collections.find(c => c.slug === slug);
              return (
                <button
                  key={`active-collection-${slug}`}
                  type="button"
                  onClick={() => toggleCollection(slug)}
                  className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                  aria-label={`Remove ${collection?.name || slug} filter`}
                >
                  {collection?.name || slug} 
                  <X className="h-3 w-3 group-hover:text-black" />
                </button>
              );
            })}
            
            {activeFilters.sizes.map(size => (
              <button
                key={`active-size-${size}`}
                type="button"
                onClick={() => toggleSize(size)}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                aria-label={`Remove ${size} size filter`}
              >
                {size} <X className="h-3 w-3 group-hover:text-black" />
              </button>
            ))}
            
            {activeFilters.colors.map(color => (
              <button
                key={`active-color-${color}`}
                type="button"
                onClick={() => toggleColor(color)}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                aria-label={`Remove ${color} color filter`}
              >
                {color} <X className="h-3 w-3 group-hover:text-black" />
              </button>
            ))}
            
            {activeFilters.onSale && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('onSale')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                aria-label="Remove on sale filter"
              >
                On Sale <X className="h-3 w-3 group-hover:text-black" />
              </button>
            )}
            
            {activeFilters.inStock && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('inStock')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                aria-label="Remove in stock filter"
              >
                In Stock <X className="h-3 w-3 group-hover:text-black" />
              </button>
            )}
            
            {activeFilters.newArrivals && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('newArrivals')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                aria-label="Remove new arrivals filter"
              >
                New Arrivals <X className="h-3 w-3 group-hover:text-black" />
              </button>
            )}
            
            {activeFilters.rating !== null && (
              <button
                type="button"
                onClick={() => toggleRatingFilter(activeFilters.rating!)}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                aria-label={`Remove ${activeFilters.rating} star rating filter`}
              >
                {activeFilters.rating}★ & Up <X className="h-3 w-3 group-hover:text-black" />
              </button>
            )}
            
            {(activeFilters.priceRange.min > priceRange.min || activeFilters.priceRange.max < priceRange.max) && (
              <button
                type="button"
                onClick={() => setActiveFilters(prev => ({
                  ...prev,
                  priceRange: { min: priceRange.min, max: priceRange.max }
                }))}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group hover:theme-accent-bg hover:text-black transition-colors"
                aria-label="Remove price range filter"
              >
                ${activeFilters.priceRange.min} - ${activeFilters.priceRange.max} <X className="h-3 w-3 group-hover:text-black" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Accordion Filters */}
      <Accordion.Root type="multiple" defaultValue={['collections', 'price', 'sizes', 'colors', 'status']} className="border-none">
        {/* Collections Filter */}
        <AccordionItem value="collections">
          <AccordionTrigger>Collections</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col sm:flex-row gap-3">
              {collections.slice(0, 3).map(collection => (
                <button
                  key={collection.id}
                  onClick={() => toggleCollection(collection.slug)}
                  className={`flex-1 py-3 px-4 text-base font-bold border-2 border-black transition-all flex items-center justify-center ${
                    activeFilters.collections.includes(collection.slug)
                      ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]'
                      : 'bg-white text-black hover:bg-black hover:text-white hover:border-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pb-6">
              <div className="mb-6">
                <Slider.Root
                  className="relative flex items-center select-none w-full h-5 cursor-pointer"
                  value={[localPriceRange.min, localPriceRange.max]}
                  min={priceRange.min}
                  max={priceRange.max}
                  step={5}
                  minStepsBetweenThumbs={1}
                  onValueChange={handleSliderChange}
                  onValueCommit={applyPriceRange}
                  aria-label="Price Range"
                >
                  <Slider.Track className="bg-gray-200 relative h-2 flex-grow border border-black">
                    <Slider.Range className="absolute h-full theme-accent-bg" />
                  </Slider.Track>
                  <Slider.Thumb 
                    className="block w-5 h-5 bg-white border-2 border-black shadow-[0px_1px_3px_rgba(0,0,0,0.3)] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300" 
                    aria-label="Minimum price"
                  />
                  <Slider.Thumb 
                    className="block w-5 h-5 bg-white border-2 border-black shadow-[0px_1px_3px_rgba(0,0,0,0.3)] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300" 
                    aria-label="Maximum price"
                  />
                </Slider.Root>
              </div>
              
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-medium">${localPriceRange.min}</span>
                <span className="text-sm font-medium">${localPriceRange.max}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setLocalPriceRange({ min: priceRange.min, max: priceRange.max });
                    setActiveFilters(prev => ({
                      ...prev,
                      priceRange: { min: priceRange.min, max: priceRange.max }
                    }));
                  }}
                  className="py-1.5 px-2 border border-black text-xs font-bold hover:bg-gray-100 transition-colors"
                >
                  RESET
                </button>
                <button
                  type="button"
                  onClick={applyPriceRange}
                  className="py-1.5 px-2 theme-accent-bg border border-black text-xs font-bold hover:brightness-95 transition-colors"
                >
                  APPLY
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Size Filter */}
        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {filteredSizes.map(size => (
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
        
        {/* Colors Filter */}
        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-3">
              {filteredColors.map(color => (
                <button
                  key={`color-${color}`}
                  type="button"
                  className={`group flex flex-col items-center gap-1.5`}
                  onClick={() => toggleColor(color)}
                  aria-label={`Filter by ${color}`}
                  aria-pressed={activeFilters.colors.includes(color)}
                >
                  <div 
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                      ${activeFilters.colors.includes(color) ? 'border-black' : 'border-gray-300 group-hover:border-gray-400'}`}
                    style={{ 
                      backgroundColor: color === 'natural' ? '#e8dcc2' : 
                                    color === 'white' ? '#ffffff' :
                                    color === 'black' ? '#000000' : color
                    }}
                  >
                    {activeFilters.colors.includes(color) && (
                      <Check size={12} className={`${color === 'white' || color === 'natural' ? 'text-black' : 'text-white'}`} />
                    )}
                  </div>
                  <span className="text-xs capitalize">{color}</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Status Filters */}
        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <FilterStatusButton
                label="On Sale"
                description="Products with discounted prices"
                icon={<Tag size={16} />}
                isActive={activeFilters.onSale}
                onClick={() => toggleBooleanFilter('onSale')}
              />
              <FilterStatusButton
                label="New Arrivals"
                description="Recently added products"
                icon={<Zap size={16} />}
                isActive={activeFilters.newArrivals}
                onClick={() => toggleBooleanFilter('newArrivals')}
              />
              <FilterStatusButton
                label="In Stock"
                description="Products currently available"
                icon={<Shield size={16} />}
                isActive={activeFilters.inStock}
                onClick={() => toggleBooleanFilter('inStock')}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Rating Filter */}
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1.5">
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={`rating-${rating}`}
                  type="button"
                  onClick={() => toggleRatingFilter(rating)}
                  className={`flex items-center py-2 px-3 border-2 transition-colors ${
                    activeFilters.rating === rating
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-200 hover:border-black'
                  }`}
                  aria-pressed={activeFilters.rating === rating}
                >
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={`star-${rating}-${i}`}
                        size={16} 
                        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} ${activeFilters.rating === rating && i >= rating ? 'text-gray-500' : ''}`}
                        strokeWidth={1.5}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">& Up</span>
                  </div>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion.Root>
    </div>
  );
}

// Custom Accordion components with simplified styling
function AccordionItem({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <Accordion.Item 
      value={value}
      className="border-b-2 border-black last:border-b-0"
    >
      {children}
    </Accordion.Item>
  );
}

function AccordionTrigger({ children }: { children: React.ReactNode }) {
  return (
    <Accordion.Header>
      <Accordion.Trigger className="group flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left text-sm font-bold uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-black">
        {children}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

function AccordionContent({ children }: { children: React.ReactNode }) {
  return (
    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      <div className="p-4">{children}</div>
    </Accordion.Content>
  );
}

// Custom filter option button
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
      className={`py-2 px-3 text-xs font-bold border-2 transition-colors ${
        isActive
          ? 'bg-black text-white border-black' 
          : 'bg-white text-black border-gray-200 hover:border-black'
      }`}
      aria-pressed={isActive ? 'true' : 'false'}
    >
      {label}
    </button>
  );
}

// Filter status button with icon and description
function FilterStatusButton({ 
  label, 
  description,
  icon,
  isActive, 
  onClick 
}: { 
  label: string; 
  description: string;
  icon: React.ReactNode;
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center py-2.5 px-3 border-2 transition-colors ${
        isActive
          ? 'bg-black text-white border-black' 
          : 'bg-white text-black border-gray-200 hover:border-black'
      }`}
      aria-pressed={isActive ? 'true' : 'false'}
    >
      <div className={`flex-shrink-0 flex items-center justify-center p-1.5 mr-2 border rounded-full ${
        isActive ? 'bg-white border-white' : 'theme-accent-bg border-black'
      }`}>
        {React.cloneElement(icon as React.ReactElement, { 
          className: isActive ? 'text-black' : ''
        })}
      </div>
      <div className="text-left">
        <div className="text-sm font-bold">{label}</div>
        <div className={`text-xs ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>{description}</div>
      </div>
      <div className="ml-auto pl-2">
        {isActive && <Check size={16} />}
      </div>
    </button>
  );
} 