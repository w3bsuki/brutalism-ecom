# E-commerce Backend Requirements with Supabase

This document outlines the backend architecture and requirements for implementing the Brutalist E-commerce platform using Supabase.

## Why Supabase for E-commerce

Supabase is an excellent choice for our e-commerce platform for several reasons:

1. **PostgreSQL Database**: Provides a robust, scalable database with transactional support crucial for e-commerce operations
2. **Authentication System**: Built-in auth including social logins and JWT support
3. **Storage**: Managed file storage for product images and assets
4. **Realtime**: Live updates for inventory, carts, and order status
5. **Row-Level Security (RLS)**: Fine-grained access control for customer data and orders
6. **Serverless Functions**: API endpoints for payment processing and custom business logic
7. **Economical**: Generous free tier with predictable scaling costs

## Database Schema Design

### Tables

#### 1. Products

```sql
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  price decimal(10, 2) not null,
  sale_price decimal(10, 2),
  category_id uuid references categories(id),
  is_featured boolean default false,
  is_new boolean default false,
  is_trending boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable full-text search
alter table products add column search tsvector 
  generated always as (to_tsvector('english', name || ' ' || coalesce(description, ''))) stored;

create index products_search_idx on products using gin(search);
```

#### 2. Product Variants

```sql
create table product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  sku text not null unique,
  size text,
  color text,
  stock_quantity integer not null default 0,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### 3. Categories

```sql
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  parent_id uuid references categories(id),
  created_at timestamp with time zone default now()
);
```

#### 4. Orders

```sql
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  status text not null check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount decimal(10, 2) not null,
  shipping_address jsonb not null,
  billing_address jsonb not null,
  payment_intent_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### 5. Order Items

```sql
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  quantity integer not null,
  unit_price decimal(10, 2) not null,
  total_price decimal(10, 2) not null,
  created_at timestamp with time zone default now()
);
```

#### 6. User Profiles

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  first_name text,
  last_name text,
  phone text,
  default_shipping_address jsonb,
  default_billing_address jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### 7. Wishlists

```sql
create table wishlists (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, product_id)
);
```

## Authentication Strategy

Supabase provides a robust authentication system that will handle:

1. **Email/Password Authentication**: Standard signup/login
2. **Social Login**: Integration with Google, Facebook, etc.
3. **JWT Tokens**: Used for API authentication
4. **Password Reset**: Automated flows for account recovery

### Implementation Notes:

- Use Supabase Auth UI components for quick implementation
- Set up email templates for verification, password reset, etc.
- Implement protected routes for checkout and account management

## Row-Level Security Policies

Example policies for data protection:

```sql
-- Allow users to read all products
create policy "Products are viewable by everyone" 
on products for select using (true);

-- Allow users to only see their own orders
create policy "Users can only view their own orders" 
on orders for select using (auth.uid() = user_id);

-- Allow users to only manage their own wishlist
create policy "Users can only manage their own wishlists" 
on wishlists for all using (auth.uid() = user_id);
```

## Storage Implementation

Supabase Storage will handle:

1. **Product Images**: Multiple images per product variant
2. **User Uploads**: For user reviews or custom orders
3. **Invoice PDFs**: For order receipts

### Storage Buckets:

```sql
-- Create buckets
insert into storage.buckets (id, name) values ('product-images', 'Product Images');
insert into storage.buckets (id, name) values ('user-uploads', 'User Uploads');
insert into storage.buckets (id, name) values ('invoices', 'Order Invoices');

-- Set RLS policies
create policy "Product images are viewable by everyone"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "Invoices are viewable by their owners"
on storage.objects for select
using (
  bucket_id = 'invoices' and 
  (storage.foldername(name)::uuid = auth.uid())
);
```

## API & Edge Functions

For custom business logic and third-party integrations:

1. **Payment Processing**: Integration with Stripe/PayPal
2. **Inventory Management**: Stock updates and alerts
3. **Order Fulfillment**: Shipping provider integration
4. **Email Notifications**: Order updates and marketing

Example Edge Function:

```typescript
// example edge function for processing payments
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import Stripe from 'https://esm.sh/stripe@12.0.0'

serve(async (req) => {
  const { orderId, paymentMethodId } = await req.json()
  
  // Initialize Supabase client
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )
  
  // Initialize Stripe
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    apiVersion: '2022-11-15',
  })
  
  // Get order details
  const { data: order } = await supabaseClient
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()
    
  // Process payment with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total_amount * 100), // Convert to cents
    currency: 'usd',
    payment_method: paymentMethodId,
    confirm: true,
    return_url: `${Deno.env.get('FRONTEND_URL')}/order-confirmation/${orderId}`,
  })
  
  // Update order with payment intent ID
  await supabaseClient
    .from('orders')
    .update({ 
      payment_intent_id: paymentIntent.id,
      status: paymentIntent.status === 'succeeded' ? 'processing' : 'pending'
    })
    .eq('id', orderId)
  
  return new Response(
    JSON.stringify({ success: true, paymentIntent }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

## Realtime Features

Implement these realtime subscription features:

1. **Cart Synchronization**: Across multiple devices
2. **Inventory Updates**: Show "Only X left!" notifications
3. **Order Status**: Live updates to order processing steps

Example implementation:

```typescript
// Setting up realtime subscriptions
const cartChannel = supabase
  .channel('public:carts')
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'carts', filter: `user_id=eq.${user.id}` },
    (payload) => {
      // Update cart state with the latest data
      setCart(payload.new);
    }
  )
  .subscribe()
```

## Migration Strategy

For development to production:

1. Use Supabase migrations to version schema changes
2. Implement seed data for development and testing
3. Create separate development/staging/production environments

## Scaling Considerations

1. **Database Indexes**: Optimize common queries
2. **Connection Pooling**: For high traffic periods
3. **Cache Strategy**: Consider Redis for high-read data
4. **CDN Integration**: For product images and assets

## Next Steps for Backend Implementation

1. Set up initial Supabase project
2. Create database schema with migrations
3. Implement authentication flow
4. Set up storage buckets and access policies
5. Create initial API endpoints for product/order management
6. Integrate with payment provider
7. Implement realtime features 