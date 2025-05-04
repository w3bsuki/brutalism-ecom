# Supabase MCP Integration Guide

This guide outlines how to integrate the Supabase Machine-to-Cloud Protocol (MCP) with our Brutalist E-commerce project. This integration will enable AI assistants to directly interact with our database, enhancing the customer shopping experience through conversational commerce.

## What is Supabase MCP?

The Supabase MCP server is a connector that allows AI assistants (like Claude, ChatGPT, etc.) to interact directly with our Supabase database. It provides a secure way for LLMs to:

1. Query product data
2. Process transactions
3. Check order status
4. Update user preferences
5. Access and update database information in real-time

## Benefits for E-commerce

- **Conversational Shopping**: Customers can ask about products, check availability, and make purchases through chat
- **Personalized Recommendations**: AI can query purchase history to make relevant suggestions
- **Order Management**: Customers can check order status, modify orders, or initiate returns via conversation
- **Inventory Insights**: Get real-time inventory data for decision-making
- **Customer Service Automation**: Handle common queries about shipping, returns, etc.

## Architecture Overview

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│              │    │              │    │              │
│  AI Assistant├────▶  Supabase MCP├────▶   Supabase   │
│  (Claude)    │    │    Server    │    │   Database   │
│              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Implementation Steps

### 1. Set Up Supabase MCP Server

```bash
# Clone the repository
git clone https://github.com/supabase-community/supabase-mcp.git
cd supabase-mcp

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit the `.env` file with your Supabase credentials:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
MCP_API_KEY=your-generated-api-key
```

### 2. Define Database Access Policies

The MCP server should have appropriate permissions. Create a specific SQL role for it:

```sql
-- Create a role for the MCP server
CREATE ROLE mcp_role;

-- Grant read access to products table
GRANT SELECT ON products TO mcp_role;
GRANT SELECT ON product_variants TO mcp_role;
GRANT SELECT ON categories TO mcp_role;

-- Grant limited write access to orders
GRANT SELECT, INSERT ON orders TO mcp_role;
GRANT SELECT, INSERT ON order_items TO mcp_role;

-- Grant access to user profiles with restrictions
GRANT SELECT, UPDATE (first_name, last_name, phone) ON profiles TO mcp_role;
```

### 3. Define AI Functions in Supabase

Create SQL functions that the AI assistant can call via MCP:

```sql
-- Function to search products by keyword
CREATE OR REPLACE FUNCTION search_products(search_term TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  price DECIMAL,
  sale_price DECIMAL,
  category TEXT,
  in_stock BOOLEAN
) LANGUAGE sql AS $$
  SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.sale_price,
    c.name as category,
    EXISTS (
      SELECT 1 FROM product_variants pv 
      WHERE pv.product_id = p.id AND pv.stock_quantity > 0
    ) as in_stock
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE p.search @@ plainto_tsquery('english', search_term)
  ORDER BY ts_rank(p.search, plainto_tsquery('english', search_term)) DESC
  LIMIT 10;
$$;

-- Function to check stock for a product
CREATE OR REPLACE FUNCTION check_product_stock(product_id UUID)
RETURNS TABLE (
  size TEXT,
  color TEXT,
  stock_quantity INTEGER
) LANGUAGE sql AS $$
  SELECT 
    size,
    color,
    stock_quantity
  FROM product_variants
  WHERE product_id = check_product_stock.product_id
  AND stock_quantity > 0;
$$;

-- Function to create an order
CREATE OR REPLACE FUNCTION create_order(
  p_user_id UUID,
  p_items JSONB,
  p_shipping_address JSONB,
  p_billing_address JSONB
) RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
  v_order_id UUID;
  v_total DECIMAL := 0;
  v_item JSONB;
  v_product_id UUID;
  v_variant_id UUID;
  v_price DECIMAL;
  v_quantity INTEGER;
BEGIN
  -- Calculate total and validate items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_quantity := (v_item->>'quantity')::INTEGER;
    
    -- Get product price
    SELECT 
      COALESCE(sale_price, price) INTO v_price
    FROM products
    WHERE id = v_product_id;
    
    -- Add to total
    v_total := v_total + (v_price * v_quantity);
  END LOOP;

  -- Create order
  INSERT INTO orders (
    user_id,
    status,
    total_amount,
    shipping_address,
    billing_address
  ) VALUES (
    p_user_id,
    'pending',
    v_total,
    p_shipping_address,
    p_billing_address
  ) RETURNING id INTO v_order_id;
  
  -- Add order items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_quantity := (v_item->>'quantity')::INTEGER;
    
    -- Get product price again
    SELECT 
      COALESCE(sale_price, price) INTO v_price
    FROM products
    WHERE id = v_product_id;
    
    -- Add order item
    INSERT INTO order_items (
      order_id,
      product_id,
      variant_id,
      quantity,
      unit_price,
      total_price
    ) VALUES (
      v_order_id,
      v_product_id,
      v_variant_id,
      v_quantity,
      v_price,
      v_price * v_quantity
    );
  END LOOP;
  
  RETURN v_order_id;
END;
$$;
```

### 4. Configure MCP Schema

Create an `mcp-schema.json` configuration file that defines what operations the AI can perform:

```json
{
  "name": "brutalist-ecommerce",
  "description": "Brutalist E-commerce platform for hat products",
  "version": "1.0.0",
  "functions": [
    {
      "name": "searchProducts",
      "description": "Search for products by keyword",
      "parameters": {
        "type": "object",
        "properties": {
          "searchTerm": {
            "type": "string",
            "description": "Keyword to search for"
          }
        },
        "required": ["searchTerm"]
      },
      "supabase": {
        "function": "search_products"
      }
    },
    {
      "name": "getProductStock",
      "description": "Check available stock for a product",
      "parameters": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "description": "UUID of the product"
          }
        },
        "required": ["productId"]
      },
      "supabase": {
        "function": "check_product_stock"
      }
    },
    {
      "name": "createOrder",
      "description": "Create a new order",
      "parameters": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "description": "UUID of the user"
          },
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "productId": {
                  "type": "string",
                  "description": "UUID of the product"
                },
                "variantId": {
                  "type": "string",
                  "description": "UUID of the product variant"
                },
                "quantity": {
                  "type": "integer",
                  "description": "Quantity to order"
                }
              },
              "required": ["productId", "variantId", "quantity"]
            }
          },
          "shippingAddress": {
            "type": "object",
            "properties": {
              "street": { "type": "string" },
              "city": { "type": "string" },
              "state": { "type": "string" },
              "zipCode": { "type": "string" },
              "country": { "type": "string" }
            },
            "required": ["street", "city", "state", "zipCode", "country"]
          },
          "billingAddress": {
            "type": "object",
            "properties": {
              "street": { "type": "string" },
              "city": { "type": "string" },
              "state": { "type": "string" },
              "zipCode": { "type": "string" },
              "country": { "type": "string" }
            },
            "required": ["street", "city", "state", "zipCode", "country"]
          }
        },
        "required": ["userId", "items", "shippingAddress", "billingAddress"]
      },
      "supabase": {
        "function": "create_order"
      }
    }
  ]
}
```

### 5. Integrate with Frontend

Add the Supabase MCP client to your frontend:

```bash
npm install @supabase/supabase-mcp-client
```

Create a utility for interacting with the MCP server:

```typescript
// src/lib/mcp.ts
import { createClient } from '@supabase/supabase-mcp-client';

const mcpClient = createClient({
  url: process.env.NEXT_PUBLIC_MCP_URL,
  apiKey: process.env.NEXT_PUBLIC_MCP_API_KEY,
});

export async function searchProducts(searchTerm: string) {
  return mcpClient.functions.invoke('searchProducts', {
    searchTerm,
  });
}

export async function getProductStock(productId: string) {
  return mcpClient.functions.invoke('getProductStock', {
    productId,
  });
}

export async function createOrder(
  userId: string,
  items: Array<{ productId: string; variantId: string; quantity: number }>,
  shippingAddress: object,
  billingAddress: object
) {
  return mcpClient.functions.invoke('createOrder', {
    userId,
    items,
    shippingAddress,
    billingAddress,
  });
}
```

### 6. Create AI Assistant Integration

Implement a chat interface that leverages the MCP integration:

```tsx
// src/components/AIShoppingAssistant.tsx
'use client';

import { useState } from 'react';
import { searchProducts, getProductStock, createOrder } from '@/lib/mcp';

export function AIShoppingAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Process user message and determine intent
      // In a real app, this would be handled by a proper AI service
      if (input.toLowerCase().includes('search') || input.toLowerCase().includes('find')) {
        // Extract search term
        const searchTerm = input.replace(/search|find|for/gi, '').trim();
        
        // Use MCP to search products
        const products = await searchProducts(searchTerm);
        
        // Add AI response with product results
        setMessages([
          ...messages, 
          userMessage,
          { 
            role: 'assistant', 
            content: `Here are some ${searchTerm} products I found:`,
            products,
          }
        ]);
      } else {
        // Default response
        setMessages([
          ...messages, 
          userMessage,
          { 
            role: 'assistant', 
            content: "I can help you find products, check stock, and place orders. Try asking me to search for a product!"
          }
        ]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages([
        ...messages, 
        userMessage,
        { 
          role: 'assistant', 
          content: "I'm having trouble processing your request. Please try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border-2 border-black p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Shopping Assistant</h2>
      
      <div className="h-64 overflow-y-auto mb-4 p-2 border border-gray-200">
        {messages.map((message, i) => (
          <div key={i} className={`mb-2 ${message.role === 'user' ? 'text-right' : ''}`}>
            <div 
              className={`inline-block p-2 rounded ${
                message.role === 'user' 
                  ? 'bg-gray-100 border border-gray-300' 
                  : 'bg-black text-white'
              }`}
            >
              {message.content}
            </div>
            
            {message.products && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {message.products.map((product) => (
                  <div key={product.id} className="border border-black p-2">
                    <div className="font-bold">{product.name}</div>
                    <div>${product.price}</div>
                    <button className="bg-black text-white px-2 py-1 mt-1 text-sm">
                      View Product
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="text-center text-gray-500">Assistant is thinking...</div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about products..."
          className="flex-1 border-2 border-black p-2"
        />
        <button 
          type="submit" 
          className="bg-black text-white font-bold py-2 px-4 border-2 border-black"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

## Testing the Integration

1. Start the MCP server:
   ```bash
   npm start
   ```

2. Test basic functionality with curl:
   ```bash
   curl -X POST \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your-api-key" \
     -d '{"function":"searchProducts","parameters":{"searchTerm":"bucket hat"}}' \
     http://localhost:3000/api/v1/functions/invoke
   ```

3. Integrate with your favorite AI assistant's function calling capabilities.

## Security Considerations

1. **API Key Protection**: Keep your MCP API key secure and use environment variables
2. **RLS Policies**: Implement proper Row Level Security in Supabase
3. **Input Validation**: Validate all inputs from AI assistants
4. **Access Logging**: Monitor access to your MCP server
5. **Rate Limiting**: Implement rate limiting to prevent abuse

## Next Steps

1. Implement more advanced functions for inventory management
2. Add product recommendation functions based on purchase history
3. Create functions for order status updates and tracking
4. Add support for returns and exchanges
5. Implement analytics to track AI assistant usage patterns

## Resources

- [Supabase MCP Documentation](https://github.com/supabase-community/supabase-mcp)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [AI Function Calling Best Practices](https://supabase.com/blog/ai-functions-endpoints) 