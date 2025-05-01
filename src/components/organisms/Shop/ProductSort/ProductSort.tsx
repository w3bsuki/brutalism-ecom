"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductSortProps, SortOption } from "./types";

/**
 * ProductSort - Component for sorting products in the shop
 * 
 * Provides a dropdown menu to select different sorting options for products.
 * Follows brutalist design principles with bold borders and sharp transitions.
 */
export function ProductSort({ sortOption, setSortOption, className }: ProductSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Available sort options
  const sortOptions: SortOption[] = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "top-rated", label: "Top Rated" },
    { value: "best-selling", label: "Best Selling" },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get current option label
  const currentOption = sortOptions.find((option) => option.value === sortOption);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        id="sort-menu-button"
        type="button"
        className="flex items-center justify-between w-full border-2 sm:border-3 border-black bg-white py-1.5 sm:py-2.5 px-3 sm:px-5 text-xs sm:text-sm font-bold text-black hover:bg-[color:var(--accent-bg)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <span className="mr-2">Sort: {currentOption?.label || "Featured"}</span>
        <ChevronDown
          className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-48 sm:w-56 border-2 sm:border-4 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <ul
            role="listbox"
            aria-labelledby="sort-menu-button"
            className="py-1"
          >
            {sortOptions.map((option) => {
              const isSelected = sortOption === option.value;
              
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected ? "true" : "false"}
                  className={`cursor-pointer px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold hover:bg-[color:var(--accent-bg)] border-b border-black/10 last:border-b-0 flex items-center justify-between ${
                    isSelected ? "bg-[color:var(--accent-bg)]" : ""
                  }`}
                  onClick={() => {
                    setSortOption(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
} 