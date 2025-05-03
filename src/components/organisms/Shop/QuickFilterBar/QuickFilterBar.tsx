"use client";

import { ChevronDown, ChevronUp, SlidersHorizontal, Tag, Sparkle, Package, Search, ArrowDownUp } from "lucide-react";
import { ProductSort } from "@/components/organisms/Shop/ProductSort";
import { QuickFilterBarProps } from "./types";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * QuickFilterBar component
 * 
 * A horizontal bar for quickly filtering products by collection, sale status,
 * and new arrivals, as well as sorting products. Enhanced with improved UI elements.
 */
export function QuickFilterBar({
  collections,
  activeFilters,
  priceRange,
  sortOption,
  productCount,
  hasActiveFilters,
  setActiveFilters,
  setQuickCollectionFilter,
  toggleSaleFilter,
  toggleNewArrivalsFilter,
  toggleInStockFilter,
  showAdvancedFilters,
  setShowAdvancedFilters,
  setSortOption
}: QuickFilterBarProps) {
  // Take the first 3 most popular collections for the quick filter
  const popularCollections = collections.slice(0, 3);

  // Local state to manage tabs
  const [activeTab, setActiveTab] = useState<'collections' | 'quick' | 'sort'>('collections');
  
  return (
    <motion.div 
      className="w-full border-2 border-black mb-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with filter title and product count */}
      <div className="flex items-center justify-between p-4 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-xl font-bold uppercase tracking-tight">
            FILTER PRODUCTS
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="theme-accent-bg text-black text-sm font-bold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {productCount} {productCount === 1 ? 'product' : 'products'} found
          </span>
          
          {hasActiveFilters && (
            <button
              onClick={() => {
                setActiveFilters({
                  collections: [],
                  priceRange: { min: priceRange.min, max: priceRange.max },
                  sizes: [],
                  colors: [],
                  onSale: false,
                  inStock: false,
                  newArrivals: false,
                });
                setSortOption("featured");
              }}
              className="bg-white text-black text-xs font-bold py-1.5 px-3 border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
            >
              CLEAR ALL
            </button>
          )}
          
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-1.5 bg-black text-white text-xs font-bold py-1.5 px-3 border-2 border-black hover:bg-white hover:text-black hover:border-[color:var(--accent-bg)] transition-colors"
          >
            {showAdvancedFilters ? (
              <>
                <ChevronUp size={14} aria-hidden="true" />
                HIDE ADVANCED
              </>
            ) : (
              <>
                <ChevronDown size={14} aria-hidden="true" />
                SHOW ADVANCED
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Main filter content */}
      <div className="bg-white">
        {/* Filter tabs navigation - Improved with consistent styling and better visual distinction */}
        <div className="flex border-b-2 border-black">
          <button
            onClick={() => setActiveTab('collections')}
            className={`flex-1 py-3 px-4 text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5 border-r-2 border-black ${
              activeTab === 'collections' 
                ? 'bg-black text-white border-t-4 border-t-[color:var(--accent-bg)]' 
                : 'bg-gray-100 text-black hover:bg-black hover:text-white hover:border-t-4 hover:border-t-[color:var(--accent-bg)]'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
            Collections
          </button>
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-3 px-4 text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5 border-r-2 border-black ${
              activeTab === 'quick' 
                ? 'bg-black text-white border-t-4 border-t-[color:var(--accent-bg)]' 
                : 'bg-gray-100 text-black hover:bg-black hover:text-white hover:border-t-4 hover:border-t-[color:var(--accent-bg)]'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>
            Quick Filters
          </button>
          <button
            onClick={() => setActiveTab('sort')}
            className={`flex-1 py-3 px-4 text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'sort' 
                ? 'bg-black text-white border-t-4 border-t-[color:var(--accent-bg)]' 
                : 'bg-gray-100 text-black hover:bg-black hover:text-white hover:border-t-4 hover:border-t-[color:var(--accent-bg)]'
            }`}
          >
            <ArrowDownUp size={14} className="mr-1" />
            Sort By
          </button>
        </div>
        
        {/* Tab content - Improved with consistent spacing and organization */}
        <div className="p-4 min-h-[120px]">
          {/* Collections tab - Grid layout with consistent sizing */}
          {activeTab === 'collections' && (
            <div className="flex flex-col sm:flex-row gap-3">
              {popularCollections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setQuickCollectionFilter(collection)}
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
          )}
          
          {/* Quick filters tab - Improved with consistent button styling */}
          {activeTab === 'quick' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={toggleSaleFilter}
                className={`flex-1 py-3 px-4 text-sm font-bold border-2 border-black transition-all flex items-center justify-center gap-2 ${
                  activeFilters.onSale
                    ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:border-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <Tag size={16} /> ON SALE
              </button>
              <button
                onClick={toggleNewArrivalsFilter}
                className={`flex-1 py-3 px-4 text-sm font-bold border-2 border-black transition-all flex items-center justify-center gap-2 ${
                  activeFilters.newArrivals
                    ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:border-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <Sparkle size={16} /> NEW ARRIVALS
              </button>
              <button
                onClick={toggleInStockFilter}
                className={`flex-1 py-3 px-4 text-sm font-bold border-2 border-black transition-all flex items-center justify-center gap-2 ${
                  activeFilters.inStock
                    ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:border-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <Package size={16} /> IN STOCK
              </button>
            </div>
          )}
          
          {/* Sort tab - Better centered and more prominent */}
          {activeTab === 'sort' && (
            <div className="flex justify-center py-2">
              <ProductSort sortOption={sortOption} setSortOption={setSortOption} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 