# Medusa.js Wishlist Customization Guide

This document provides instructions for implementing a custom wishlist feature in Medusa.js, which is not available out-of-the-box but can be added through Medusa's extensibility features.

## Wishlist Feature Overview

The wishlist functionality will allow users to:
- Add products to their wishlist
- Remove products from their wishlist
- View all items in their wishlist
- Add wishlist items to their cart

## Implementation Approach

We'll use Medusa's custom entity and endpoints features to create a wishlist system that works well with our existing UI.

### 1. Create Custom Wishlist Entity

First, we need to create a custom entity for wishlists in the Medusa server:

```javascript
// medusa-backend/src/models/wishlist.ts
import { 
  BeforeInsert, 
  Column, 
  Entity, 
  Index, 
  JoinColumn, 
  ManyToOne, 
  OneToMany 
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { Customer } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { WishlistItem } from "./wishlist-item"

@Entity()
export class Wishlist extends BaseEntity {
  @Index()
  @Column({ nullable: true })
  customer_id: string | null

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist, {
    cascade: ["insert", "update", "remove"]
  })
  items: WishlistItem[]

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wish")
  }
}
```

```javascript
// medusa-backend/src/models/wishlist-item.ts
import { 
  BeforeInsert, 
  Column, 
  Entity, 
  Index, 
  JoinColumn, 
  ManyToOne
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { Product } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Wishlist } from "./wishlist"

@Entity()
export class WishlistItem extends BaseEntity {
  @Index()
  @Column()
  wishlist_id: string

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  @JoinColumn({ name: "wishlist_id" })
  wishlist: Wishlist

  @Index()
  @Column()
  product_id: string

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wish_item")
  }
}
```

### 2. Register Models in Medusa Configuration

Register the models in the Medusa server by adding them to `medusa-config.js`:

```javascript
// medusa-backend/medusa.config.js
// ... other configurations
module.exports = {
  // ... other configs
  modules: {
    // ... other modules
    extendedModels: {
      Wishlist: {
        modelPath: "dist/models/wishlist",
        modelName: "Wishlist",
      },
      WishlistItem: {
        modelPath: "dist/models/wishlist-item",
        modelName: "WishlistItem",
      }
    }
  }
}
```

### 3. Create Wishlist Service

Create a service to handle wishlist operations:

```javascript
// medusa-backend/src/services/wishlist.ts
import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { Wishlist } from "../models/wishlist"
import { WishlistItem } from "../models/wishlist-item"
import { ProductService } from "@medusajs/medusa"

class WishlistService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager
  protected productService_: ProductService

  constructor(container) {
    super(container)
    this.productService_ = container.productService
  }

  async getWishlistByCustomer(customerId, config = {}) {
    const wishlistRepo = this.manager_.getRepository(Wishlist)
    
    let wishlist = await wishlistRepo.findOne({
      where: { customer_id: customerId },
      relations: ["items", "items.product"],
    })
    
    if (!wishlist) {
      wishlist = await this.create({ customer_id: customerId })
    }
    
    return wishlist
  }

  async create(data) {
    return this.atomicPhase_(async (manager) => {
      const wishlistRepo = manager.getRepository(Wishlist)
      const wishlist = wishlistRepo.create(data)
      return await wishlistRepo.save(wishlist)
    })
  }

  async addItem(wishlistId, productId) {
    return this.atomicPhase_(async (manager) => {
      // Validate product exists
      const product = await this.productService_.retrieve(productId)
      if (!product) {
        throw new Error(`Product with id ${productId} not found`)
      }
      
      const wishlistRepo = manager.getRepository(Wishlist)
      const wishlistItemRepo = manager.getRepository(WishlistItem)
      
      // Check if wishlist exists
      const wishlist = await wishlistRepo.findOne({
        where: { id: wishlistId },
        relations: ["items"]
      })
      
      if (!wishlist) {
        throw new Error(`Wishlist with id ${wishlistId} not found`)
      }
      
      // Check if item already exists in wishlist
      const existingItem = wishlist.items.find(item => item.product_id === productId)
      if (existingItem) {
        return wishlist // Item already exists, return wishlist
      }
      
      // Create wishlist item
      const wishlistItem = wishlistItemRepo.create({
        wishlist_id: wishlistId,
        product_id: productId
      })
      
      await wishlistItemRepo.save(wishlistItem)
      
      // Return updated wishlist
      return await wishlistRepo.findOne({
        where: { id: wishlistId },
        relations: ["items", "items.product"]
      })
    })
  }

  async removeItem(wishlistId, itemId) {
    return this.atomicPhase_(async (manager) => {
      const wishlistRepo = manager.getRepository(Wishlist)
      const wishlistItemRepo = manager.getRepository(WishlistItem)
      
      // Check if wishlist exists
      const wishlist = await wishlistRepo.findOne({
        where: { id: wishlistId },
        relations: ["items"]
      })
      
      if (!wishlist) {
        throw new Error(`Wishlist with id ${wishlistId} not found`)
      }
      
      // Check if item exists in wishlist
      const item = await wishlistItemRepo.findOne({
        where: { id: itemId, wishlist_id: wishlistId }
      })
      
      if (!item) {
        throw new Error(`Item with id ${itemId} not found in wishlist`)
      }
      
      // Remove item
      await wishlistItemRepo.remove(item)
      
      // Return updated wishlist
      return await wishlistRepo.findOne({
        where: { id: wishlistId },
        relations: ["items", "items.product"]
      })
    })
  }

  async clearWishlist(wishlistId) {
    return this.atomicPhase_(async (manager) => {
      const wishlistRepo = manager.getRepository(Wishlist)
      const wishlistItemRepo = manager.getRepository(WishlistItem)
      
      // Check if wishlist exists
      const wishlist = await wishlistRepo.findOne({
        where: { id: wishlistId },
        relations: ["items"]
      })
      
      if (!wishlist) {
        throw new Error(`Wishlist with id ${wishlistId} not found`)
      }
      
      // Remove all items
      await wishlistItemRepo.remove(wishlist.items)
      
      // Return updated wishlist
      return await wishlistRepo.findOne({
        where: { id: wishlistId },
        relations: ["items"]
      })
    })
  }
}

export default WishlistService
```

### 4. Register the Wishlist Service

Register the service in the Medusa container:

```javascript
// medusa-backend/src/services/index.ts
import WishlistService from "./wishlist"

export default {
  wishlistService: WishlistService,
}
```

### 5. Create API Routes for Wishlist

Add custom API endpoints to handle wishlist operations:

```javascript
// medusa-backend/src/api/routes/store/wishlist/index.ts
import { Router } from "express"
import { wrapHandler } from "@medusajs/medusa"
import { 
  getWishlist, 
  addWishlistItem, 
  removeWishlistItem, 
  clearWishlist 
} from "./handlers"

const router = Router()

export default (storeRouter) => {
  storeRouter.use("/customers/me/wishlist", router)
  
  // Get the current customer's wishlist
  router.get("/", wrapHandler(getWishlist))
  
  // Add an item to the wishlist
  router.post("/", wrapHandler(addWishlistItem))
  
  // Remove an item from the wishlist
  router.delete("/:id", wrapHandler(removeWishlistItem))
  
  // Clear the wishlist
  router.delete("/", wrapHandler(clearWishlist))
  
  return router
}
```

### 6. Create Request Handlers

Implement the handlers for the wishlist routes:

```javascript
// medusa-backend/src/api/routes/store/wishlist/handlers.ts
import { EntityManager } from "typeorm"

/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise} Returns wishlist data
 */
export const getWishlist = async (req, res) => {
  const wishlistService = req.scope.resolve("wishlistService")
  
  if (!req.user?.customer_id) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  
  const wishlist = await wishlistService.getWishlistByCustomer(req.user.customer_id)
  
  const transformedItems = wishlist.items.map(item => ({
    id: item.id,
    product: {
      id: item.product.id,
      title: item.product.title,
      description: item.product.description,
      handle: item.product.handle,
      thumbnail: item.product.thumbnail,
      // Add other product fields as needed
    }
  }))
  
  res.json({
    wishlist: {
      id: wishlist.id,
      items: transformedItems
    }
  })
}

/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise} Returns updated wishlist
 */
export const addWishlistItem = async (req, res) => {
  const wishlistService = req.scope.resolve("wishlistService")
  
  if (!req.user?.customer_id) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  
  const { product_id } = req.body
  
  if (!product_id) {
    return res.status(400).json({ message: "Product ID is required" })
  }
  
  // Get or create the customer's wishlist
  const wishlist = await wishlistService.getWishlistByCustomer(req.user.customer_id)
  
  // Add item to wishlist
  const updated = await wishlistService.addItem(wishlist.id, product_id)
  
  const transformedItems = updated.items.map(item => ({
    id: item.id,
    product: {
      id: item.product.id,
      title: item.product.title,
      description: item.product.description,
      handle: item.product.handle,
      thumbnail: item.product.thumbnail,
      // Add other product fields as needed
    }
  }))
  
  res.json({
    wishlist: {
      id: updated.id,
      items: transformedItems
    }
  })
}

/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise} Returns updated wishlist
 */
export const removeWishlistItem = async (req, res) => {
  const wishlistService = req.scope.resolve("wishlistService")
  
  if (!req.user?.customer_id) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  
  const { id } = req.params
  
  // Get the customer's wishlist
  const wishlist = await wishlistService.getWishlistByCustomer(req.user.customer_id)
  
  // Remove item from wishlist
  const updated = await wishlistService.removeItem(wishlist.id, id)
  
  const transformedItems = updated.items.map(item => ({
    id: item.id,
    product: {
      id: item.product.id,
      title: item.product.title,
      description: item.product.description,
      handle: item.product.handle,
      thumbnail: item.product.thumbnail,
      // Add other product fields as needed
    }
  }))
  
  res.json({
    wishlist: {
      id: updated.id,
      items: transformedItems
    }
  })
}

/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise} Returns empty wishlist
 */
export const clearWishlist = async (req, res) => {
  const wishlistService = req.scope.resolve("wishlistService")
  
  if (!req.user?.customer_id) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  
  // Get the customer's wishlist
  const wishlist = await wishlistService.getWishlistByCustomer(req.user.customer_id)
  
  // Clear wishlist
  const updated = await wishlistService.clearWishlist(wishlist.id)
  
  res.json({
    wishlist: {
      id: updated.id,
      items: []
    }
  })
}
```

### 7. Register the Routes

Add the routes to Medusa's router:

```javascript
// medusa-backend/src/api/index.ts
import { Router } from "express"
import wishlistRoutes from "./routes/store/wishlist"

export default (rootRouter) => {
  const storeRouter = Router()
  rootRouter.use("/store", storeRouter)
  
  // Add wishlist routes
  wishlistRoutes(storeRouter)
  
  return rootRouter
}
```

### 8. Create Database Migrations

Create a migration to add the wishlist tables:

```javascript
// medusa-backend/src/migrations/1625160058730-add-wishlist.ts
import { MigrationInterface, QueryRunner } from "typeorm"

export class AddWishlist1625160058730 implements MigrationInterface {
  name = "AddWishlist1625160058730"
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "wishlist" (
        "id" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "customer_id" character varying,
        PRIMARY KEY ("id")
      )
    `)
    
    await queryRunner.query(`
      CREATE TABLE "wishlist_item" (
        "id" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "wishlist_id" character varying NOT NULL,
        "product_id" character varying NOT NULL,
        PRIMARY KEY ("id")
      )
    `)
    
    await queryRunner.query(`
      CREATE INDEX "IDX_wishlist_customer_id" ON "wishlist" ("customer_id")
    `)
    
    await queryRunner.query(`
      CREATE INDEX "IDX_wishlist_item_wishlist_id" ON "wishlist_item" ("wishlist_id")
    `)
    
    await queryRunner.query(`
      CREATE INDEX "IDX_wishlist_item_product_id" ON "wishlist_item" ("product_id")
    `)
    
    await queryRunner.query(`
      ALTER TABLE "wishlist"
      ADD CONSTRAINT "FK_wishlist_customer"
      FOREIGN KEY ("customer_id")
      REFERENCES "customer"("id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `)
    
    await queryRunner.query(`
      ALTER TABLE "wishlist_item"
      ADD CONSTRAINT "FK_wishlist_item_wishlist"
      FOREIGN KEY ("wishlist_id")
      REFERENCES "wishlist"("id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `)
    
    await queryRunner.query(`
      ALTER TABLE "wishlist_item"
      ADD CONSTRAINT "FK_wishlist_item_product"
      FOREIGN KEY ("product_id")
      REFERENCES "product"("id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `)
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_wishlist_item_product"
    `)
    
    await queryRunner.query(`
      ALTER TABLE "wishlist_item" DROP CONSTRAINT "FK_wishlist_item_wishlist"
    `)
    
    await queryRunner.query(`
      ALTER TABLE "wishlist" DROP CONSTRAINT "FK_wishlist_customer"
    `)
    
    await queryRunner.query(`
      DROP INDEX "IDX_wishlist_item_product_id"
    `)
    
    await queryRunner.query(`
      DROP INDEX "IDX_wishlist_item_wishlist_id"
    `)
    
    await queryRunner.query(`
      DROP INDEX "IDX_wishlist_customer_id"
    `)
    
    await queryRunner.query(`
      DROP TABLE "wishlist_item"
    `)
    
    await queryRunner.query(`
      DROP TABLE "wishlist"
    `)
  }
}
```

### 9. Client-Side Integration

Finally, implement the front-end hook to interact with our new wishlist API:

```typescript
// src/hooks/use-medusa-wishlist.ts
import { useState, useEffect } from 'react';
import medusaClient from '@/lib/medusa-client';

export function useMedusaWishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const { data } = await medusaClient.custom.get('/store/customers/me/wishlist');
        setItems(data.wishlist.items || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError('Failed to load wishlist');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWishlist();
  }, []);
  
  // Add item to wishlist
  const addItem = async (productId) => {
    try {
      const { data } = await medusaClient.custom.post('/store/customers/me/wishlist', {
        product_id: productId
      });
      setItems(data.wishlist.items);
      return data.wishlist;
    } catch (err) {
      console.error('Error adding item to wishlist:', err);
      throw err;
    }
  };
  
  // Remove item from wishlist
  const removeItem = async (itemId) => {
    try {
      const { data } = await medusaClient.custom.delete(`/store/customers/me/wishlist/${itemId}`);
      setItems(data.wishlist.items);
      return data.wishlist;
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      throw err;
    }
  };
  
  // Clear wishlist
  const clearWishlist = async () => {
    try {
      const { data } = await medusaClient.custom.delete('/store/customers/me/wishlist');
      setItems([]);
      return data.wishlist;
    } catch (err) {
      console.error('Error clearing wishlist:', err);
      throw err;
    }
  };
  
  return {
    items,
    addItem,
    removeItem,
    clearWishlist,
    loading,
    error
  };
}

export default useMedusaWishlist;
```

## Handling Guest Wishlist

For users who aren't logged in, we can implement a local storage fallback:

```typescript
// Enhancement for useMedusaWishlist to support guest users
import { useState, useEffect } from 'react';
import medusaClient from '@/lib/medusa-client';

export function useMedusaWishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await medusaClient.auth.getSession();
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
  }, []);
  
  // Load wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      
      if (isLoggedIn) {
        // Fetch from server for logged-in users
        try {
          const { data } = await medusaClient.custom.get('/store/customers/me/wishlist');
          setItems(data.wishlist.items || []);
          setError(null);
        } catch (err) {
          console.error('Error fetching wishlist:', err);
          setError('Failed to load wishlist');
          setItems([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Use localStorage for guests
        try {
          const localWishlist = localStorage.getItem('guest_wishlist');
          if (localWishlist) {
            setItems(JSON.parse(localWishlist));
          } else {
            setItems([]);
          }
          setError(null);
        } catch (err) {
          console.error('Error reading local wishlist:', err);
          setItems([]);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchWishlist();
  }, [isLoggedIn]);
  
  // Save guest wishlist to localStorage
  useEffect(() => {
    if (!isLoggedIn && items.length >= 0) {
      localStorage.setItem('guest_wishlist', JSON.stringify(items));
    }
  }, [items, isLoggedIn]);
  
  // Add item to wishlist
  const addItem = async (productId) => {
    if (isLoggedIn) {
      // Add to server wishlist
      try {
        const { data } = await medusaClient.custom.post('/store/customers/me/wishlist', {
          product_id: productId
        });
        setItems(data.wishlist.items);
        return data.wishlist;
      } catch (err) {
        console.error('Error adding item to wishlist:', err);
        throw err;
      }
    } else {
      // Add to local wishlist
      try {
        // Get product details
        const { product } = await medusaClient.products.retrieve(productId);
        
        // Format item similar to server response
        const newItem = {
          id: `local_${Date.now()}`,
          product: {
            id: product.id,
            title: product.title,
            description: product.description,
            handle: product.handle,
            thumbnail: product.thumbnail
          }
        };
        
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        
        return { items: updatedItems };
      } catch (err) {
        console.error('Error adding item to local wishlist:', err);
        throw err;
      }
    }
  };
  
  // Other methods (removeItem, clearWishlist) would also need similar logic...
  
  return {
    items,
    addItem,
    // Include other methods with similar isLoggedIn pattern
    loading,
    error,
    isLoggedIn
  };
}
```

## Migration Strategy

When a guest user logs in, we should migrate their local wishlist to their server wishlist:

```typescript
// Example of wishlist migration from local to server
const migrateLocalWishlistToServer = async () => {
  try {
    // Get local wishlist items
    const localWishlist = localStorage.getItem('guest_wishlist');
    
    if (localWishlist) {
      const localItems = JSON.parse(localWishlist);
      
      // Add each local item to server wishlist
      for (const item of localItems) {
        await medusaClient.custom.post('/store/customers/me/wishlist', {
          product_id: item.product.id
        });
      }
      
      // Clear local wishlist after migration
      localStorage.removeItem('guest_wishlist');
    }
  } catch (err) {
    console.error('Error migrating wishlist:', err);
  }
};
```

This migration function should be called after a successful login or registration. 