/**
 * Props for the ProductSort component
 */
export interface ProductSortProps {
  /**
   * Current selected sort option
   */
  sortOption: string;
  
  /**
   * Function to update sort option
   */
  setSortOption: (option: string) => void;
  
  /**
   * Optional class name for styling
   */
  className?: string;
}

/**
 * Sort option object type
 */
export interface SortOption {
  value: string;
  label: string;
} 