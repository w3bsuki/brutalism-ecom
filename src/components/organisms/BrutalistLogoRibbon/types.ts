export interface Brand {
  name: string;
  isMain?: boolean;
  badge?: string;
}

export interface BrutalistLogoRibbonProps {
  title?: string;
  brands?: Brand[];
} 