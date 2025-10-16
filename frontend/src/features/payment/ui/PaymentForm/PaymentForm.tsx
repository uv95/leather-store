import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getClientSecret, getPaymentLoading } from '../..';
import toast from '../../../../shared/lib/toast/toast';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import styles from './PaymentForm.module.scss';
import PaymentFormSkeleton from '../PaymentFormSkeleton/PaymentFormSkeleton';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const loading = useSelector(getPaymentLoading);
  const clientSecret = useSelector(getClientSecret);
  const [isPaymentElementLoading, setIsPaymentElementLoading] = useState(true);

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement('payment');
      paymentElement?.on('ready', () => setIsPaymentElementLoading(false));
    }
  }, [elements]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      toast.error(submitError.message || 'Please fill in your payment details');

      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
    } else {
      toast.success('The order is successfully paid');
    }
  };

  return (
    <form className={styles.PaymentForm}>
      {isPaymentElementLoading && <PaymentFormSkeleton />}

      <PaymentElement className={styles.payment} />
      {clientSecret && !isPaymentElementLoading && (
        <Button
          className={styles.button}
          size={ButtonSize.L}
          theme={ButtonTheme.BLACK}
          disabled={!stripe || loading === 'pending'}
          type="submit"
          onClick={onSubmit}
        >
          {loading === 'pending' ? 'Processing...' : 'Pay Now'}
        </Button>
      )}
    </form>
  );
};

export default PaymentForm;
