import { useSearchParams } from 'react-router-dom';
import { StripeElementsProvider } from '../../../../features/payment';
import CheckoutSuccessfulContent from '../CheckoutSuccessfulContent/CheckoutSuccessfulContent';

const CheckoutSuccessfulPage = () => {
  const [params] = useSearchParams();
  const clientSecret = params.get('payment_intent_client_secret') || '';

  return (
    <StripeElementsProvider clientSecret={clientSecret}>
      <CheckoutSuccessfulContent />
    </StripeElementsProvider>
  );
};

export default CheckoutSuccessfulPage;
