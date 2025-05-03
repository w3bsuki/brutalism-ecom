"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { additionalProducts } from "@/data/additional-products";
import { collections } from "@/data/collections";
import { ShopProductFilters } from "@/components/organisms/Shop/ProductFilters";
import { ProductQuickView } from "@/components/organisms/Product/ProductQuickView/ProductQuickView";
import { RecentlyViewedSection } from "@/components/organisms/Product/RecentlyViewedSection";
import { BrutalistTextMarquee } from "@/components/organisms/BrutalistTextMarquee";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { Filter, Sparkles, Zap, ArrowRight, Search } from "lucide-react";
import { ShopHero } from '../ShopHero';
import { QuickFilterBar } from '../QuickFilterBar';
import { ProductGrid } from '../ProductGrid';
import { useProductFiltering } from '@/hooks/use-product-filtering';
import { ShopPageContentProps } from "./types";
import { useInView } from 'react-intersection-observer';

/**
 * ShopPageContent component
 * 
 * The main shop page content including all product filtering, sorting, and display functionality.
 * This component has been refactored to use smaller, more focused components and custom hooks.
 */
export function ShopPageContent({}: ShopPageContentProps) {
  // Combine original and additional products
  const allProducts = [...products, ...additionalProducts];
  
  // Use the product filtering hook to handle all filtering/sorting logic
  const {
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
    uniqueSizes,
    uniqueColors,
    priceRange
  } = useProductFiltering(allProducts, collections);
  
  // UI state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { addProduct } = useRecentlyViewed();

  // Add Intersection Observer hook for RecentlyViewedSection
  const {
    ref: recentlyViewedRef, // Ref to attach to the trigger element
    inView: isRecentlyViewedVisible, // Boolean indicating if the element is in view
  } = useInView({
    triggerOnce: true, // Only trigger once when the component comes into view
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '200px 0px', // Load 200px before it enters the viewport
  });

  // Handle quick view open/close
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    
    // Add to recently viewed when opening quick view
    addProduct(product);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero section */}
      <ShopHero 
        title="SHOP ALL PRODUCTS"
        subtitle="Browse our complete collection of premium hats and headwear. Find the perfect style to express yourself."
      />

      {/* Add marquee below hero section */}
      <BrutalistTextMarquee 
        text="🧢 FIND YOUR PERFECT HAT 🧢"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={75}
        direction="left"
      />

      {/* Streamlined Announcements Bar - replacing the 3 cards */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles size={16} className="text-black" />
              <span>NEW ARRIVALS WEEKLY</span>
            </div>
            <div className="hidden sm:flex font-bold">|</div>
            <div className="flex items-center gap-1.5 font-bold">
              <Zap size={16} className="text-red-600" />
              <span>UP TO 40% OFF SALE ITEMS</span>
            </div>
            <div className="hidden sm:flex font-bold">|</div>
            <div className="flex items-center gap-1.5 font-bold">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              <span>FREE SHIPPING OVER $50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        {/* Quick Filter Bar */}
        <QuickFilterBar 
          collections={collections}
          activeFilters={activeFilters}
          priceRange={priceRange}
          sortOption={sortOption}
          productCount={filteredProducts.length}
          hasActiveFilters={hasActiveFilters}
          setActiveFilters={setActiveFilters}
          setQuickCollectionFilter={setQuickCollectionFilter}
          toggleSaleFilter={toggleSaleFilter}
          toggleNewArrivalsFilter={toggleNewArrivalsFilter}
          toggleInStockFilter={toggleInStockFilter}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          setSortOption={setSortOption}
        />

        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Mobile filters toggle */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <button
              type="button"
              className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:theme-accent-bg hover:text-black transition-colors flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter size={16} aria-hidden="true" />
              {mobileFiltersOpen ? "HIDE FILTERS" : "ADVANCED FILTERS"}
            </button>
            
            {filteredProducts.length > 0 && (
              <div className="text-sm font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </div>
            )}
          </div>

          {/* Products Layout */}
          <div className="flex flex-col-reverse md:flex-row w-full gap-6">
            {/* Advanced Filters sidebar - conditionally rendered */}
            {(mobileFiltersOpen || showAdvancedFilters) && (
              <div className="w-full md:w-64 lg:w-72 flex-shrink-0 transition-all duration-300 ease-in-out mb-4 md:mb-0">
                <ShopProductFilters
                  collections={collections}
                  priceRange={priceRange}
                  sizes={uniqueSizes}
                  colors={uniqueColors}
                  activeFilters={activeFilters}
                  setActiveFilters={setActiveFilters}
                  className="md:sticky md:top-4"
                />
              </div>
            )}
            
            {/* Product Grid Section */}
            <div className="flex-1 relative min-h-[300px]">
              {/* Empty State */}
              {filteredProducts.length === 0 ? (
                <div className="border-2 border-black p-6 flex flex-col items-center text-center bg-white">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-2 border-black">
                    <Search className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Products Found</h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't find any products that match your filters. Try changing or clearing your filters.
                  </p>
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
                          rating: null,
                        });
                      }}
                      className="theme-accent-bg text-black font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:brightness-95"
                    >
                      CLEAR ALL FILTERS
                    </button>
                  )}
                </div>
              ) : (
                <ProductGrid
                  products={filteredProducts}
                  onQuickView={openQuickView}
                  showAdvancedFilters={showAdvancedFilters || mobileFiltersOpen}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Recently Viewed Products Section - Now wrapped with Intersection Observer */}
        <div ref={recentlyViewedRef} className="mt-12 md:mt-16 lg:mt-20 min-h-[100px]">
          {isRecentlyViewedVisible && (
            <RecentlyViewedSection />
          )}
        </div>
        
        {/* Quick View Modal */}
        {isQuickViewOpen && quickViewProduct && (
          <ProductQuickView 
            product={quickViewProduct}
            isOpen={isQuickViewOpen}
            onClose={closeQuickView}
          />
        )}
      </div>
    </div>
  );
}

export default ShopPageContent; 