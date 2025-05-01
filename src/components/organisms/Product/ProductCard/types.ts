import { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
} 