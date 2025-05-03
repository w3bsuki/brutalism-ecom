import { Collection } from './types';
import { Product } from '@/types/product';
import { products } from '@/data/products';
import { additionalProducts } from '@/data/additional-products';
import { supabase } from './supabase';

// Define a consistent placeholder image path
const placeholderImage = "/images/hats/placeholder1.jpg";

/**
 * Normalize product data to ensure consistent format across the application
 */
export function normalizeProduct(product: any): Product {
  // Calculate sale price if discount is provided
  let salePrice = product.salePrice || product.sale_price;
  if (!salePrice && product.discount && product.discount > 0) {
    salePrice = product.price * (1 - product.discount / 100);
  }

  return {
    id: product.id || `product-${Math.random().toString(36).substr(2, 9)}`,
    name: product.name || "Untitled Product",
    slug: product.slug || product.name?.toLowerCase().replace(/\s+/g, '-') || 'untitled-product',
    description: product.description || `A premium quality hat for all occasions.`,
    price: typeof product.price === 'number' ? product.price : 0,
    salePrice: salePrice || undefined,
    discount: typeof product.discount === 'number' ? product.discount : 0,
    images: Array.isArray(product.images) && product.images.length ? 
      product.images : (typeof product.images === 'string' ? JSON.parse(product.images) : [placeholderImage, placeholderImage]),
    colors: Array.isArray(product.colors) ? product.colors : 
            (typeof product.colors === 'string' ? JSON.parse(product.colors) : []),
    sizes: Array.isArray(product.sizes) ? product.sizes : 
           (typeof product.sizes === 'string' ? JSON.parse(product.sizes) : []),
    collection: product.collection || product.category || "caps",
    categories: Array.isArray(product.categories) ? 
      product.categories : (typeof product.categories === 'string' ? 
      JSON.parse(product.categories) : product.category ? [product.category] : ["caps"]),
    thumbnail: product.thumbnail || (Array.isArray(product.images) && product.images[0]) || placeholderImage,
    isFeatured: Boolean(product.isFeatured || product.is_featured),
    isNew: Boolean(product.isNew || product.is_new),
    isSale: Boolean(product.isSale) || (product.discount && product.discount > 0) || (product.salePrice && product.salePrice < product.price),
    inStock: product.inStock !== false, // Default to true unless explicitly false
    rating: typeof product.rating === 'number' ? product.rating : 4.0,
    reviews: product.reviews || product.reviewCount || product.review_count || 0,
    reviewCount: product.reviewCount || product.review_count || product.reviews || 0,
    createdAt: product.createdAt || product.created_at || new Date().toISOString(),
    updatedAt: product.updatedAt || product.updated_at || new Date().toISOString(),
  };
}

/**
 * Fetch featured collections from API
 */
export async function getFeaturedCollections(): Promise<Collection[]> {
  try {
    // Try to fetch from Supabase
    const { data: collectionsData, error } = await supabase
      .from('collections')
      .select('*')
      .limit(4);
    
    if (error) {
      console.error('Error fetching collections from Supabase:', error);
      throw error;
    }
    
    if (collectionsData && collectionsData.length > 0) {
      // Convert from Supabase format to our app format
      return collectionsData.map(collection => ({
        id: collection.id,
        name: collection.name,
        slug: collection.handle,
        description: collection.description || '',
        image: collection.image || '/images/hats/placeholder.jpg',
        products: []
      }));
    }
    
    // Fallback to mock data if Supabase is empty or not properly set up
    return getMockFeaturedCollections();
  } catch (err) {
    console.error('Error in getFeaturedCollections:', err);
    // Fallback to mock data
    return getMockFeaturedCollections();
  }
}

function getMockFeaturedCollections(): Collection[] {
  // Mock data for featured collections
  return [
    {
      id: '1',
      name: 'Summer Collection',
      slug: 'summer-collection',
      description: 'Stay cool and stylish with our summer hat collection.',
      image: '/images/hats/placeholder.jpg',
      products: [] // Ensure this is always an array
    },
    {
      id: '2',
      name: 'Winter Essentials',
      slug: 'winter-essentials',
      description: 'Keep warm with our premium winter hats.',
      image: '/images/hats/placeholder.jpg',
      products: [] // Ensure this is always an array
    },
    {
      id: '3',
      name: 'Sport Caps',
      slug: 'sport-caps',
      description: 'Performance hats designed for athletes and sport enthusiasts.',
      image: '/images/hats/placeholder.jpg',
      products: [] // Ensure this is always an array
    }
  ];
}

// Mock data for trending products
const trendingProductsData: Product[] = [
  {
    id: '1',
    name: 'Classic Fedora',
    slug: 'classic-fedora',
    description: 'A timeless classic that adds sophistication to any outfit',
    price: 59.99,
    images: ['/images/hats/placeholder1.jpg', '/images/hats/placeholder1.jpg'],
    categories: ['fedora', 'formal'],
    colors: ['black', 'brown', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isSale: false,
    isFeatured: true,
    collection: 'formal',
    thumbnail: '/images/hats/placeholder1.jpg',
    inStock: true,
    rating: 4.5,
    reviewCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Summer Straw Hat',
    slug: 'summer-straw-hat',
    description: 'Light and comfortable straw hat for hot summer days',
    price: 45.99,
    salePrice: 35.99,
    images: ['/images/hats/placeholder1.jpg', '/images/hats/placeholder1.jpg'],
    categories: ['straw', 'summer'],
    colors: ['natural', 'white'],
    sizes: ['M', 'L'],
    isNew: false,
    isSale: true,
    isFeatured: true,
    collection: 'summer',
    thumbnail: '/images/hats/placeholder1.jpg',
    inStock: true,
    rating: 4.2,
    reviewCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Vintage Newsboy Cap',
    slug: 'vintage-newsboy-cap',
    description: 'Classic newsboy style with a modern twist',
    price: 39.99,
    images: ['/images/hats/placeholder1.jpg', '/images/hats/placeholder1.jpg'],
    categories: ['cap', 'casual', 'vintage'],
    colors: ['gray', 'black', 'brown', 'navy'],
    sizes: ['S', 'M', 'L'],
    isNew: false,
    isSale: false,
    isFeatured: true,
    collection: 'casual',
    thumbnail: '/images/hats/placeholder1.jpg',
    inStock: true,
    rating: 4.0,
    reviewCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Winter Beanie',
    slug: 'winter-beanie',
    description: 'Warm knitted beanie for cold weather',
    price: 29.99,
    salePrice: 24.99,
    images: ['/images/hats/placeholder1.jpg', '/images/hats/placeholder1.jpg'],
    categories: ['beanie', 'winter'],
    colors: ['gray', 'black', 'navy', 'red'],
    sizes: ['one-size'],
    isNew: true,
    isSale: true,
    isFeatured: true,
    collection: 'winter',
    thumbnail: '/images/hats/placeholder1.jpg',
    inStock: true,
    rating: 4.8,
    reviewCount: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Get trending products
 * @returns Array of trending products
 */
export async function getTrendingProducts(): Promise<Product[]> {
  try {
    // Try to fetch from Supabase
    const { data: productsData, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(8);
    
    if (error) {
      console.error('Error fetching trending products from Supabase:', error);
      throw error;
    }
    
    if (productsData && productsData.length > 0) {
      // Convert from Supabase format to our app format
      return productsData.map(normalizeProduct);
    }
    
    // Fallback to mock data
    return trendingProductsData;
  } catch (err) {
    console.error('Error in getTrendingProducts:', err);
    // Fallback to mock data
    return trendingProductsData;
  }
}

/**
 * Fetch all products from API
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    // Try to fetch from Supabase
    const { data: productsData, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all products from Supabase:', error);
      throw error;
    }
    
    if (productsData && productsData.length > 0) {
      // Convert from Supabase format to our app format
      return productsData.map(normalizeProduct);
    }
    
    // Fallback to mock data
    return products.map(normalizeProduct);
  } catch (err) {
    console.error('Error in getAllProducts:', err);
    // Fallback to mock data
    return products.map(normalizeProduct);
  }
}

/**
 * Fetch a product by slug
 */
export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  try {
    // Try to fetch from Supabase
    const { data: productData, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error(`Error fetching product with slug ${slug} from Supabase:`, error);
      // If not found in Supabase, fall back to local data
      throw error;
    }
    
    if (productData) {
      return normalizeProduct(productData);
    }
    
    // Fallback to local data
    const allProducts = [...products, ...additionalProducts];
    const product = allProducts.find(product => product.slug === slug);
    return product;
  } catch (err) {
    // Fallback to local data
    const allProducts = [...products, ...additionalProducts];
    const product = allProducts.find(product => product.slug === slug);
    return product;
  }
}; 