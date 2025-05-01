import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types/product";
import { Collection } from "@/lib/types";

export interface ShopPageContentProps {
  // If needed, we can add props here for future extensibility
}

export interface ActiveFilters {
  collections: string[];
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: string[];
  onSale: boolean;
  inStock: boolean;
  newArrivals: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
} 