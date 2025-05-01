"use client";

import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { additionalProducts } from "@/data/additional-products";
import { collections } from "@/data/collections";
import ProductCard from "@/components/shop/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import { ProductSort } from "@/components/organisms/Shop/ProductSort";
import ProductQuickView from "@/components/shop/ProductQuickView";
import { RecentlyViewedSection } from "@/components/organisms/Product/RecentlyViewedSection";
import { BrutalistTextMarquee } from "@/components/home/BrutalistTextMarquee";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { Product } from "@/types/product";
import { Filter, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { ShopPageContentProps, ActiveFilters, PriceRange } from "./types";

export function ShopPageContent({}: ShopPageContentProps) {
  // Combine original and additional products
  const allProducts = [...products, ...additionalProducts];
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    collections: [] as string[],
    priceRange: { min: 0, max: 100 },
    sizes: [] as string[],
    colors: [] as string[],
    onSale: false,
    inStock: false,
    newArrivals: false,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { addProduct } = useRecentlyViewed();

  // Handle quick view open/close
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    
    // Add to recently viewed when opening quick view
    addProduct(product);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // Toggle sale filter in horizontal filter bar
  const toggleSaleFilter = () => {
    setActiveFilters({
      ...activeFilters,
      onSale: !activeFilters.onSale
    });
  };

  // Toggle new arrivals filter in horizontal filter bar
  const toggleNewArrivalsFilter = () => {
    setActiveFilters({
      ...activeFilters,
      newArrivals: !activeFilters.newArrivals
    });
  };

  // Toggle in stock filter in horizontal filter bar
  const toggleInStockFilter = () => {
    setActiveFilters({
      ...activeFilters,
      inStock: !activeFilters.inStock
    });
  };

  // Set collection filter for quick filtering
  const setQuickCollectionFilter = (collection: any) => {
    // If already selected, remove it
    if (activeFilters.collections.includes(collection.slug)) {
      setActiveFilters({
        ...activeFilters,
        collections: activeFilters.collections.filter(c => c !== collection.slug)
      });
    } else {
      // Otherwise add it
      setActiveFilters({
        ...activeFilters,
        collections: [...activeFilters.collections, collection.slug]
      });
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts];

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

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high-low":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "top-rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "best-selling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default: // featured
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
        break;
    }

    setFilteredProducts(result);
  }, [activeFilters, sortOption]);

  // Get unique values for filters
  const uniqueSizes = [...new Set(allProducts.flatMap(p => p.sizes))];
  const uniqueColors = [...new Set(allProducts.flatMap(p => p.colors))];
  const priceRange: PriceRange = {
    min: Math.floor(Math.min(...allProducts.map(p => p.salePrice || p.price))),
    max: Math.ceil(Math.max(...allProducts.map(p => p.price)))
  };

  // Check if any filters are active
  const hasActiveFilters = 
    activeFilters.collections.length > 0 || 
    activeFilters.sizes.length > 0 || 
    activeFilters.colors.length > 0 || 
    activeFilters.onSale || 
    activeFilters.inStock || 
    activeFilters.newArrivals;

  // Take the first 4 most popular collections for the horizontal filter
  const popularCollections = collections.slice(0, 4);

  return (
    <div className="w-full bg-white">
      {/* Hero section - enhanced with brutalist elements and improved mobile styling */}
      <div className="w-full bg-black border-b-4 sm:border-b-4 theme-accent-border py-6 sm:py-10 md:py-16 relative overflow-hidden">
        {/* Diagonal lines background pattern */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 theme-accent-border opacity-20 rotate-12 hidden sm:block"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 border-2 theme-accent-border opacity-20 -rotate-12 hidden sm:block"></div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center relative">
          <div className="relative inline-block mb-3 sm:mb-4">
            <div className="absolute -inset-1 sm:-inset-2 theme-accent-bg rotate-1 z-0"></div>
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter px-4 sm:px-6 py-2 sm:py-3 bg-black border-2 sm:border-2 theme-accent-border z-10 shadow-[2px_2px_0px_0px_rgba(253,224,71,0.8)] sm:shadow-[4px_4px_0px_0px_rgba(253,224,71,0.8)]">
              SHOP ALL PRODUCTS
            </h1>
          </div>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Browse our complete collection of premium hats and headwear. 
            Find the perfect style to express yourself.
          </p>
        </div>
      </div>

      {/* Add marquee below hero section */}
      <BrutalistTextMarquee 
        text="🧢 FIND YOUR PERFECT HAT 🧢"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={75}
        direction="left"
      />

      {/* Shop content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-12">
        {/* Horizontal Quick Filter Bar - NEW */}
        <div className="w-full border-2 border-black mb-6 bg-white">
          <div className="p-3 md:p-4 border-b-2 border-black bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Quick Filters</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-1 bg-black text-white text-xs font-bold py-1.5 px-3 border-2 border-black theme-hover-accent transition-colors"
                >
                  {showAdvancedFilters ? (
                    <>
                      <ChevronUp size={14} />
                      HIDE ADVANCED FILTERS
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} />
                      SHOW ADVANCED FILTERS
                    </>
                  )}
                </button>
                
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
                    className="bg-red-600 text-white text-xs font-bold py-1.5 px-3 border-2 border-black"
                  >
                    CLEAR ALL
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-3 md:p-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {/* Collection Quick Filters */}
            <div className="col-span-2 md:col-span-3">
              <label className="text-xs font-semibold mb-1 block text-gray-600">COLLECTIONS</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {popularCollections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => setQuickCollectionFilter(collection)}
                    className={`px-3 py-2 text-xs font-bold border-2 border-black transition-colors ${
                      activeFilters.collections.includes(collection.slug)
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick Toggle Filters */}
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs font-semibold mb-1 block text-gray-600">FILTER BY</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={toggleSaleFilter}
                  className={`px-2 py-2 text-xs font-bold border-2 border-black transition-colors ${
                    activeFilters.onSale
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  ON SALE
                </button>
                <button
                  onClick={toggleNewArrivalsFilter}
                  className={`px-2 py-2 text-xs font-bold border-2 border-black transition-colors ${
                    activeFilters.newArrivals
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  NEW
                </button>
                <button
                  onClick={toggleInStockFilter}
                  className={`px-2 py-2 text-xs font-bold border-2 border-black transition-colors ${
                    activeFilters.inStock
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  IN STOCK
                </button>
              </div>
            </div>
          </div>
          
          {/* Sort and Results Count Row */}
          <div className="border-t-2 border-black p-3 md:p-4 flex flex-col sm:flex-row justify-between items-center bg-gray-50">
            <div className="mb-2 sm:mb-0">
              <span className="bg-black text-white text-xs font-bold px-3 py-1.5 border-2 border-black">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </span>
            </div>
            <ProductSort sortOption={sortOption} setSortOption={setSortOption} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Mobile filters toggle - enhanced */}
          <div className="md:hidden flex items-center justify-between mb-3">
            <button
              type="button"
              className="bg-black text-white font-bold py-1.5 px-3 border-2 border-black theme-hover-accent transition-colors flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter size={14} />
              {mobileFiltersOpen ? "HIDE FILTERS" : "ADVANCED FILTERS"}
            </button>
          </div>

          {/* Advanced Filters sidebar - now truly toggleable on both mobile and desktop */}
          {(mobileFiltersOpen || showAdvancedFilters) && (
            <div className="w-full md:w-64 lg:w-72 flex-shrink-0 transition-all duration-300 ease-in-out mb-4 md:mb-0">
              <ProductFilters
                collections={collections}
                priceRange={priceRange}
                sizes={uniqueSizes}
                colors={uniqueColors}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            </div>
          )}

          {/* Product grid */}
          <div className={`flex-1 ${(mobileFiltersOpen || showAdvancedFilters) ? 'md:block' : 'w-full'}`}>
            {/* Products grid - improved for mobile with 2 columns */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onQuickView={() => openQuickView(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 sm:border-3 border-black p-4 sm:p-6 md:p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 text-gray-300">
                    <SlidersHorizontal className="w-full h-full" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Try adjusting your filters to find what you're looking for.
                  </p>
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
                    className="bg-black text-white font-bold py-2 px-4 border-2 border-black theme-hover-accent transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
            )}
            
            {/* Back to top button - adding for better mobile UX */}
            {filteredProducts.length > 12 && (
              <div className="flex justify-center mt-6 sm:mt-8">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-black text-white text-xs sm:text-sm font-bold py-1.5 sm:py-2 px-3 sm:px-4 border-2 border-black theme-hover-accent transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  BACK TO TOP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed marquee above the recently viewed section */}
      <BrutalistTextMarquee 
        text="👁️ RECENTLY VIEWED 👁️"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={70}
        direction="left"
      />

      {/* Recently viewed products section */}
      <RecentlyViewedSection />

      {/* Community Text Marquee - At the bottom of the page above footer */}
      <BrutalistTextMarquee 
        text="❤️ JOIN THE HAT GANG ❤️"
        bgColor="bg-black"
        textColor="text-white"
        borderColor="theme-accent-bg"
        speed={75}
        direction="right"
      />

      {/* Quick view modal */}
      <ProductQuickView 
        product={quickViewProduct} 
        isOpen={isQuickViewOpen} 
        onClose={closeQuickView}
      />
    </div>
  );
}

export default ShopPageContent; 