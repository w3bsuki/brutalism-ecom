"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductSortProps, SortOption } from "./types";

/**
 * ProductSort - Component for sorting products in the shop
 * 
 * Provides a row of buttons to select different sorting options for products.
 * Follows brutalist design principles with bold borders, matching the other filters.
 */
export function ProductSort({ sortOption, setSortOption, className }: ProductSortProps) {
  // Available sort options - limited to the most important ones
  const sortOptions: SortOption[] = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "top-rated", label: "Top Rated" },
  ];

  return (
    <div className={cn("flex flex-wrap gap-2 w-full", className)}>
      {sortOptions.map((option) => {
        const isSelected = sortOption === option.value;
        
        return (
          <button
            key={option.value}
            onClick={() => setSortOption(option.value)}
            className={`py-3 px-4 text-base font-bold border-2 border-black transition-all flex items-center gap-1.5 flex-1 justify-center ${
              isSelected
                ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]'
                : 'bg-white text-black hover:bg-black hover:text-white hover:border-[color:var(--accent-bg)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
            aria-pressed={isSelected ? "true" : "false"}
          >
            {option.value.includes('price') && <ArrowUpDown className="h-4 w-4" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
} 