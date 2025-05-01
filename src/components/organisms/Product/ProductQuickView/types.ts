import { Product } from "@/types/product";

export interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
} 