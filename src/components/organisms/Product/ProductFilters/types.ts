import { Product } from '@/types';

export interface Collection {
  id: string;
  name: string;
}

export interface Size {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface Filters {
  minPrice: number;
  maxPrice: number;
  collections: string[];
  sizes: string[];
  colors: string[];
}

export interface ProductFiltersProps {
  initialFilters?: Partial<FilterState>;
  collections: Array<{
    id: string;
    name: string;
  }>;
  sizes: Array<{
    id: string;
    name: string;
  }>;
  colors: Array<{
    id: string;
    name: string;
    hex: string;
  }>;
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ActiveFilters {
  collections: string[];
  sizes: string[];
  colors: string[];
  priceRange: PriceRange;
}

export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterState {
  priceRange: [number, number];
  collections: string[];
  sizes: string[];
  colors: string[];
} 