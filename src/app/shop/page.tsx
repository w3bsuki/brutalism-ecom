import { Metadata, Viewport } from "next";
import ShopPageContent from "@/components/organisms/Shop/ShopPageContent";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: "Shop All Products | ХУЛИГАНКА",
  description: "Browse our complete collection of hats and headwear. Filter by style, price, and more.",
};

export default function ShopPage() {
  return <ShopPageContent />;
} 