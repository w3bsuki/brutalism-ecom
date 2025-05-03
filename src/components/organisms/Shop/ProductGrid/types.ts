import { Product } from "@/types/product";

export interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  showAdvancedFilters?: boolean;
} 