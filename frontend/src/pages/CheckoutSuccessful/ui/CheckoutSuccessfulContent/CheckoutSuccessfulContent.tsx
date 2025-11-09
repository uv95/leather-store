import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutePath } from '../../../../shared/types/routePaths';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import { ReactComponent as PaymentError } from '../../../../shared/assets/icons/error.svg';
import { ReactComponent as Success } from '../../../../shared/assets/icons/success.svg';
import styles from './CheckoutSuccessfulContent.module.scss';

const CheckoutSuccessfulContent = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(
    'loading'
  );
  const clientSecret = params.get('payment_intent_client_secret') || '';

  useEffect(() => {
    if (!clientSecret || !stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return setStatus('failed');
      }

      switch (paymentIntent.status) {
        case 'succeeded':
          setStatus('success');
          break;
        case 'processing':
          setStatus('loading');
          break;
        default:
          setStatus('failed');
      }
    });
  }, [stripe]);

  return (
    <div className={styles.CheckoutSuccessfulContent}>
      {status === 'loading' && <p>Processing...</p>}
      {status === 'success' && (
        <>
          <Success className={`${styles.icon} ${styles.successIcon}`} />
          <h1>Payment Successful</h1>
          <p>Thank you for your payment. Your order is being processed.</p>
          <Button
            size={ButtonSize.M}
            theme={ButtonTheme.BLACK}
            className={styles.button}
            onClick={() => navigate(RoutePath.USER_PROFILE)}
          >
            View Orders
          </Button>
        </>
      )}
      {status === 'failed' && (
        <>
          <PaymentError className={`${styles.icon} ${styles.errorIcon}`} />
          <h1>Payment Failed</h1>
          <p>Please try again </p>
          <Button
            size={ButtonSize.M}
            theme={ButtonTheme.BLACK}
            className={styles.button}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </>
      )}
    </div>
  );
};

export default CheckoutSuccessfulContent;
