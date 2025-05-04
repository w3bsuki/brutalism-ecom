# Medusa.js Integration Plan

This document outlines the strategy for integrating Medusa.js as the backend for our Brutalist E-commerce project, replacing the current local state management with Medusa's robust e-commerce functionality while preserving our distinct brutalist styling.

## Integration Phases

### Phase 1: Setup & Environment Configuration

1. **Setup Medusa Server**
   - [ ] Install Medusa CLI: `npm install -g @medusajs/medusa-cli`
   - [ ] Create Medusa server: `npx create-medusa-app --backend medusa-backend`
   - [ ] Configure the Medusa server environment variables
   - [ ] Run initial migrations
   - [ ] Start the server and verify it's working: `cd medusa-backend && medusa develop`

2. **Connect Next.js Frontend to Medusa**
   - [ ] Install Medusa client in the Next.js project: `npm install @medusajs/medusa-js`
   - [ ] Create a Medusa client utility file:
     ```javascript
     // src/lib/medusa-client.ts
     import { Medusa } from "@medusajs/medusa-js"
     
     const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
     
     const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
     
     export default medusaClient
     ```
   - [ ] Set up appropriate environment variables in `.env.local`
   - [ ] Set up CORS on Medusa server to allow requests from Next.js frontend

### Phase 2: Product Data Migration

1. **Set Up Medusa Products**
   - [ ] Create product categories in Medusa admin matching current categories
   - [ ] Import existing products into Medusa (manual or via import API)
   - [ ] Set up product variants for sizes and colors
   - [ ] Add product images and descriptions
   - [ ] Configure prices, inventory, and other product attributes

2. **Adapt Product Fetching Logic**
   - [ ] Create a new product data service that uses Medusa client:
     ```javascript
     // src/lib/services/product-service.ts
     import medusaClient from "@/lib/medusa-client"
     
     export async function getProducts(queryParams = {}) {
       const { products, count } = await medusaClient.products.list(queryParams)
       return { products, count }
     }
     
     export async function getProduct(handle) {
       const { product } = await medusaClient.products.retrieve(handle)
       return product
     }
     ```
   - [ ] Update product listing pages to use the new service
   - [ ] Modify product detail page to fetch data from Medusa
   - [ ] Adapt product filtering functionality to use Medusa parameters

3. **Implement Product Search**
   - [ ] Create a search utility using Medusa search API
   - [ ] Update any search components to use Medusa search
   - [ ] Test and refine search functionality

### Phase 3: Cart Functionality Migration

1. **Replace useCart Hook**
   - [ ] Create a new Medusa-based cart hook:
     ```javascript
     // src/hooks/use-medusa-cart.ts
     import { useState, useEffect } from 'react'
     import medusaClient from '@/lib/medusa-client'
     
     export function useMedusaCart() {
       const [cart, setCart] = useState(null)
       const [loading, setLoading] = useState(true)
       
       // Initialize or retrieve cart
       useEffect(() => {
         const initializeCart = async () => {
           setLoading(true)
           
           try {
             // Try to get existing cart from localStorage
             const cartId = localStorage.getItem('medusa_cart_id')
             
             if (cartId) {
               const { cart } = await medusaClient.carts.retrieve(cartId)
               setCart(cart)
             } else {
               // Create a new cart
               const { cart } = await medusaClient.carts.create()
               localStorage.setItem('medusa_cart_id', cart.id)
               setCart(cart)
             }
           } catch (error) {
             console.error("Error initializing cart:", error)
             // If error retrieving cart, create a new one
             const { cart } = await medusaClient.carts.create()
             localStorage.setItem('medusa_cart_id', cart.id)
             setCart(cart)
           } finally {
             setLoading(false)
           }
         }
         
         initializeCart()
       }, [])
       
       // Add item to cart
       const addItem = async (variantId, quantity) => {
         try {
           const { cart: updatedCart } = await medusaClient.carts.lineItems.create(cart.id, {
             variant_id: variantId,
             quantity
           })
           setCart(updatedCart)
           return updatedCart
         } catch (error) {
           console.error("Error adding item to cart:", error)
           throw error
         }
       }
       
       // Update item quantity
       const updateItemQuantity = async (lineId, quantity) => {
         try {
           const { cart: updatedCart } = await medusaClient.carts.lineItems.update(cart.id, lineId, {
             quantity
           })
           setCart(updatedCart)
           return updatedCart
         } catch (error) {
           console.error("Error updating item quantity:", error)
           throw error
         }
       }
       
       // Remove item from cart
       const removeItem = async (lineId) => {
         try {
           const { cart: updatedCart } = await medusaClient.carts.lineItems.delete(cart.id, lineId)
           setCart(updatedCart)
           return updatedCart
         } catch (error) {
           console.error("Error removing item from cart:", error)
           throw error
         }
       }
       
       // Clear cart
       const clearCart = async () => {
         // Create a new cart and replace the old one
         try {
           const { cart: newCart } = await medusaClient.carts.create()
           localStorage.setItem('medusa_cart_id', newCart.id)
           setCart(newCart)
           return newCart
         } catch (error) {
           console.error("Error clearing cart:", error)
           throw error
         }
       }
       
       // Calculate totals
       const totals = cart ? {
         subtotal: cart.subtotal / 100, // Convert from cents to dollars
         total: cart.total / 100,
         totalItems: cart.items.reduce((acc, item) => acc + item.quantity, 0),
         discount: (cart.discount_total || 0) / 100,
         tax: cart.tax_total / 100
       } : {
         subtotal: 0,
         total: 0,
         totalItems: 0,
         discount: 0,
         tax: 0
       }
       
       return {
         cart,
         items: cart?.items || [],
         loading,
         addItem,
         updateItemQuantity,
         removeItem,
         clearCart,
         ...totals
       }
     }
     ```

2. **Update Components Using Cart**
   - [ ] Update the `ProductCard` component to use the new cart hook
   - [ ] Update the `ProductQuickView` component to use the new cart hook
   - [ ] Update the Cart page to use the Medusa cart data structure
   - [ ] Test all cart interactions: add, update, remove, and clear

3. **Adapt Toast Notifications**
   - [ ] Ensure toast notifications still work with Medusa cart operations
   - [ ] Fix any styling issues with toast notifications

### Phase 4: Checkout & Order Processing

1. **Checkout Implementation**
   - [ ] Create checkout utility functions:
     ```javascript
     // src/lib/services/checkout-service.ts
     import medusaClient from '@/lib/medusa-client'
     
     export async function createPaymentSession(cartId) {
       return await medusaClient.carts.createPaymentSessions(cartId)
     }
     
     export async function setPaymentSession(cartId, providerId) {
       return await medusaClient.carts.setPaymentSession(cartId, {
         provider_id: providerId
       })
     }
     
     export async function completeCart(cartId) {
       return await medusaClient.carts.complete(cartId)
     }
     
     export async function updateShippingAddress(cartId, address) {
       return await medusaClient.carts.update(cartId, {
         shipping_address: address
       })
     }
     ```

2. **Update Checkout Pages**
   - [ ] Modify shipping information form to use Medusa address format
   - [ ] Implement payment method selection
   - [ ] Create order completion functionality
   - [ ] Design order confirmation page using Medusa order data
   - [ ] Test complete checkout flow

### Phase 5: User Accounts & Wishlist

1. **Customer Authentication**
   - [ ] Create authentication utilities with Medusa:
     ```javascript
     // src/lib/services/auth-service.ts
     import medusaClient from '@/lib/medusa-client'
     
     export async function registerCustomer(email, password, firstName, lastName) {
       return await medusaClient.customers.create({
         email,
         password,
         first_name: firstName,
         last_name: lastName
       })
     }
     
     export async function loginCustomer(email, password) {
       return await medusaClient.auth.authenticate({
         email,
         password
       })
     }
     
     export async function getCurrentCustomer() {
       return await medusaClient.customers.retrieve()
     }
     
     export async function logoutCustomer() {
       return await medusaClient.auth.deleteSession()
     }
     ```

2. **Implement Wishlist Functionality**
   - [ ] Set up a custom entity or use a plugin for wishlist functionality
   - [ ] Replace current wishlist hook with Medusa-based implementation
   - [ ] Update wishlist page to use new data source
   - [ ] Test wishlist with authenticated and guest users

### Phase 6: Finalization & Styling Consistency

1. **Test & Fix Edge Cases**
   - [ ] Verify all core flows with the new backend
   - [ ] Test edge cases (out of stock, discount codes, etc.)
   - [ ] Fix any inconsistencies between UI and data

2. **Styling Consistency Check**
   - [ ] Review all components for brutalist styling consistency
   - [ ] Ensure all Medusa data displays properly with brutalist theme
   - [ ] Test responsive design with the new implementation
   - [ ] Fix any theme toggling issues

3. **Performance Optimization**
   - [ ] Implement data preloading where appropriate
   - [ ] Add loading states for all asynchronous operations
   - [ ] Test and optimize page load times

## Data Mapping & Transformation

### Product Data Mapping

| Current Structure | Medusa Structure |
|-------------------|------------------|
| `id` | `id` |
| `name` | `title` |
| `slug` | `handle` |
| `description` | `description` |
| `price` | `variants[0].prices[0].amount / 100` |
| `salePrice` | Use Medusa's price list functionality |
| `category` | `collection.title` |
| `sizes` | Map from `options` and `variants` |
| `colors` | Map from `options` and `variants` |
| `images` | `images` |
| `isNew` | Custom attribute via metadata |
| `isTrending` | Custom attribute via metadata |

### Cart Data Mapping

| Current Structure | Medusa Structure |
|-------------------|------------------|
| `items` | `cart.items` |
| `item.id` | `item.variant_id` |
| `item.quantity` | `item.quantity` |
| `item.price` | `item.unit_price / 100` |
| `subtotal` | `cart.subtotal / 100` |
| `tax` | `cart.tax_total / 100` |
| `total` | `cart.total / 100` |
| `discount` | `cart.discount_total / 100` |

## Plugin Recommendations

1. **Payment Processing**
   - [ ] Install Stripe plugin: `npm install medusa-payment-stripe`
   - [ ] Configure Stripe in `medusa-config.js`

2. **Search Enhancement**
   - [ ] Install MeiliSearch plugin: `npm install medusa-plugin-meilisearch`
   - [ ] Configure MeiliSearch for improved product search

3. **File Storage**
   - [ ] Install S3/CloudFront plugin: `npm install medusa-file-s3`
   - [ ] Configure S3 for product images

## Timeline Estimate

1. **Phase 1: Setup & Environment** - 1-2 days
2. **Phase 2: Product Data Migration** - 2-3 days
3. **Phase 3: Cart Functionality** - 2-3 days
4. **Phase 4: Checkout & Order Processing** - 2-4 days
5. **Phase 5: User Accounts & Wishlist** - 1-2 days
6. **Phase 6: Finalization & Testing** - 1-3 days

**Total Estimated Time**: 9-17 days depending on complexity and unforeseen challenges

## Success Criteria

- All existing UI components maintain brutalist styling
- Product browsing, filtering, and search work with Medusa data
- Cart operations (add, update, remove) function correctly
- Checkout process completes successfully with test payments
- User accounts and wishlist functionality work as expected
- Performance metrics match or exceed the current implementation
- All responsive design aspects are preserved

## Rollback Plan

1. Maintain the current implementation in a separate branch
2. Document all changes made during migration
3. Set up feature flags to toggle between implementations if needed
4. Keep backup of local data before transitioning fully to Medusa 