'use client';

import { ReactNode, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

interface StripeProviderProps {
  children: ReactNode;
}

export default function StripeProvider({ children }: StripeProviderProps) {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // Initialize Stripe on the client side
    if (typeof window !== 'undefined') {
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''));
    }
  }, []);

  return <Elements stripe={stripePromise}>{children}</Elements>;
}