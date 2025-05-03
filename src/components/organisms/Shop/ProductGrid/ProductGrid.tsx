"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/organisms/Product/ProductCard/ProductCard";
import { ProductGridProps } from "./types";

/**
 * ProductGrid component
 * 
 * Displays a grid of product cards with smooth animations and responsive layout.
 * Adapts layout based on whether advanced filters are displayed.
 */
export function ProductGrid({
  products,
  onQuickView,
  showAdvancedFilters = false
}: ProductGridProps) {
  // Animation variants for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Dynamic class for grid columns based on filter visibility
  const gridClass = showAdvancedFilters
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" 
    : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6";

  return (
    <>
      <motion.div 
        className={gridClass}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {products.map((product) => (
          <motion.div 
            key={product.id}
            variants={itemVariants}
            className="product-card-container h-full"
          >
            <ProductCard 
              product={product} 
              onQuickView={() => onQuickView(product)}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Back to top button - adding for better mobile UX */}
      {products.length > 12 && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-black text-white text-xs sm:text-sm font-bold py-1.5 sm:py-2 px-3 sm:px-4 border-2 border-black theme-hover-accent transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            BACK TO TOP
          </button>
        </div>
      )}
    </>
  );
} 