import { supabase } from './supabase';
import { CartItem } from '@/hooks/use-cart';

// Interface for shipping address
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber?: string;
}

// Interface for order data
export interface OrderData {
  userEmail: string;
  orderNumber: string;
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string; // Only store last 4 digits for security
}

/**
 * Submit an order to Supabase
 */
export async function submitOrder(orderData: OrderData): Promise<{success: boolean; error?: any; orderId?: string}> {
  try {
    // Format the order data for Supabase
    const order = {
      user_email: orderData.userEmail,
      order_number: orderData.orderNumber,
      total: orderData.total,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      shipping_cost: orderData.shippingCost,
      discount: orderData.discount,
      items: orderData.items,
      shipping_address: orderData.shippingAddress,
      payment_method: orderData.paymentMethod,
      status: 'confirmed',
      order_date: new Date()
    };

    // Insert the order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select('id')
      .single();

    if (error) {
      console.error('Error submitting order to Supabase:', error);
      return { success: false, error };
    }

    return { success: true, orderId: data.id };
  } catch (err) {
    console.error('Error in submitOrder:', err);
    return { success: false, error: err };
  }
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INW-${timestamp}-${random}`;
} 