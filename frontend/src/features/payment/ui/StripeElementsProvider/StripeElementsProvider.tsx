import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

interface StripeElementsProviderProps {
  children: ReactNode;
  clientSecret: string;
}

const StripeElementsProvider = ({
  children,
  clientSecret,
}: StripeElementsProviderProps) => {
  if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
    throw new Error();
  }

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, loader: 'never' }}
    >
      {children}
    </Elements>
  );
};

export default StripeElementsProvider;
