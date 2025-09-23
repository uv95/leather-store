import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { createPayment, getClientSecret } from '../../../../features/payment';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Checkout.module.scss';
import { getCartTotal } from '../../../../entities/Cart';
import PaymentForm from '../PaymentForm/PaymentForm';
import Wrapper from '../../../../shared/ui/Wrapper/Wrapper';

if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
  throw new Error();
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const clientSecret = useSelector(getClientSecret);
  const cartTotal = useSelector(getCartTotal);

  useEffect(() => {
    if (orderId && cartTotal) {
      dispatch(createPayment({ orderId, amount: cartTotal }));
    }
  }, [dispatch, orderId, cartTotal]);

  return (
    <Wrapper heading="Checkout">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </Wrapper>
  );
};

export default Checkout;
