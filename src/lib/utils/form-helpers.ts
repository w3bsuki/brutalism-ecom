import { z } from 'zod';

// Common zod schemas for reuse throughout the app
export const emailSchema = z.string().email('Please enter a valid email address');
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters long')
  .max(100, 'Name must be less than 100 characters');

export const phoneSchema = z
  .string()
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number');

// Checkout form schema
export const checkoutFormSchema = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  address: z.string().min(5, 'Please enter a valid address'),
  city: z.string().min(2, 'Please enter a valid city'),
  state: z.string().min(2, 'Please enter a valid state'),
  zipCode: z.string().min(4, 'Please enter a valid zip code'),
  country: z.string().min(2, 'Please enter a valid country'),
  phone: phoneSchema.optional(),
  saveInfo: z.boolean().optional(),
  shippingMethod: z.enum(['standard', 'express', 'overnight']),
  paymentMethod: z.enum(['card', 'paypal']),
});

// Define the form data type from the schema
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Newsletter signup schema
export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: nameSchema.optional(),
  interests: z.array(z.string()).optional(),
});

// Define the newsletter form data type
export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Helper function to format validation errors for display
export const formatValidationErrors = (errors: Record<string, any>) => {
  return Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = value.message || 'Invalid input';
    return acc;
  }, {} as Record<string, string>);
}; 