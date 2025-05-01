import { Collection } from '@/lib/types';

/**
 * Active filters for product filtering in the shop
 */
export interface ShopActiveFilters {
  collections: string[];
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: string[];
  onSale: boolean;
  inStock: boolean;
  newArrivals: boolean;
}

/**
 * Props for the ProductFilters component used in the shop
 */
export interface ShopProductFiltersProps {
  /**
   * Available collections to filter by
   */
  collections: Collection[];
  
  /**
   * Available price range with min and max values
   */
  priceRange: { min: number; max: number };
  
  /**
   * Available sizes to filter by
   */
  sizes: string[];
  
  /**
   * Available colors to filter by
   */
  colors: string[];
  
  /**
   * Currently active filters
   */
  activeFilters: ShopActiveFilters;
  
  /**
   * Function to update active filters
   */
  setActiveFilters: React.Dispatch<React.SetStateAction<ShopActiveFilters>>;
  
  /**
   * Optional class name for styling
   */
  className?: string;
} 