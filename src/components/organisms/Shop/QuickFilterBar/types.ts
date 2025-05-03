import { Collection } from "@/lib/types";
import { ActiveFilters, PriceRange } from "../ShopPageContent/types";

export interface QuickFilterBarProps {
  collections: Collection[];
  activeFilters: ActiveFilters;
  priceRange: PriceRange;
  sortOption: string;
  productCount: number;
  hasActiveFilters: boolean;
  setActiveFilters: (activeFilters: ActiveFilters) => void;
  setQuickCollectionFilter: (collection: Collection) => void;
  toggleSaleFilter: () => void;
  toggleNewArrivalsFilter: () => void;
  toggleInStockFilter: () => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  setSortOption: (option: string) => void;
} 