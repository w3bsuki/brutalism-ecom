'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/organisms/Product/ProductCard/ProductCard';
import { ProductQuickView } from '@/components/organisms/Product/ProductQuickView/ProductQuickView';
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";

interface BestsellersSectionProps {
  bestsellerProducts: Product[];
}

export function BestsellersSection({ bestsellerProducts }: BestsellersSectionProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addProduct } = useRecentlyViewed();

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    addProduct(product); // Add to recently viewed when opening quick view
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null); // Clear the product when closing
  };

  return (
    <>
      {/* Bestsellers Section */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={openQuickView} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {isQuickViewOpen && quickViewProduct && (
        <ProductQuickView 
          product={quickViewProduct}
          open={isQuickViewOpen}
          onClose={closeQuickView}
        />
      )}
    </>
  );
} 