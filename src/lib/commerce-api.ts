import { products as staticProducts } from '@/data/products';
import { additionalProducts } from '@/data/additional-products';
import { collections as staticCollections } from '@/data/collections';
import { Product } from '@/types/product';
import { Collection } from '@/lib/types';

// Combined products from both sources
const allProducts = [...staticProducts, ...additionalProducts];

/**
 * Commerce API 
 * 
 * This service handles product and collection data fetching and management.
 * Currently using static data, but can be replaced with API calls to a headless CMS.
 * 
 * This abstraction allows us to easily swap the data source in the future without
 * changing the application code.
 */
export class CommerceAPI {
  /**
   * Get all products
   */
  async getProducts(): Promise<Product[]> {
    // This could be replaced with an API call to a headless CMS
    return allProducts;
  }

  /**
   * Get a product by slug
   */
  async getProduct(slug: string): Promise<Product | null> {
    return allProducts.find(p => p.slug === slug) || null;
  }

  /**
   * Get all collections
   */
  async getCollections(): Promise<Collection[]> {
    return staticCollections;
  }

  /**
   * Get a collection by slug
   */
  async getCollection(slug: string): Promise<Collection | null> {
    return staticCollections.find(c => c.slug === slug) || null;
  }

  /**
   * Get products by collection
   */
  async getProductsByCollection(collectionSlug: string): Promise<Product[]> {
    return allProducts.filter(p => p.collection === collectionSlug);
  }

  /**
   * Search products
   */
  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(
      p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get product recommendations
   */
  async getProductRecommendations(productId: string, limit: number = 4): Promise<Product[]> {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return [];

    // Find products in the same collection
    const sameCollection = allProducts.filter(
      p => p.id !== productId && p.collection === product.collection
    );

    // If we have enough products in the same collection, return those
    if (sameCollection.length >= limit) {
      return sameCollection.slice(0, limit);
    }

    // Otherwise, add some featured products
    const featured = allProducts.filter(
      p => p.id !== productId && p.isFeatured && !sameCollection.includes(p)
    );

    return [...sameCollection, ...featured].slice(0, limit);
  }
}

// Export a singleton instance
export const commerceApi = new CommerceAPI(); 