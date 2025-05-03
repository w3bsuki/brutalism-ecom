import { Metadata } from 'next';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout - Indecisive Wear',
  description: 'Complete your purchase of premium brutalist hats and headwear.',
};

export default function CheckoutPage() {
  return (
    <main>
      <CheckoutForm />
    </main>
  );
} 