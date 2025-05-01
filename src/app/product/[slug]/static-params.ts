import { products } from "@/data/products";

export function generateStaticParams() {
  // Ensure we have a valid array of products with the slug property
  const validProducts = Array.isArray(products) ? products.filter(product => product && product.slug) : [];
  return validProducts.map((product) => ({
    slug: product.slug,
  }));
} 