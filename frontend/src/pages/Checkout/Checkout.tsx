import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  createPayment,
  getClientSecret,
  getPayment,
  getPaymentLoading,
  getPaymentSelector,
  retrievePaymentIntent,
  PaymentForm,
} from '../../features/payment';
import { useEffect } from 'react';
import { getCartTotal } from '../../entities/Cart';
import Wrapper from '../../shared/ui/Wrapper/Wrapper';
import styles from './Checkout.module.scss';
import { getOrder, getOrderStatus, OrderStatus } from '../../entities/Order';
import { Navigate, useSearchParams } from 'react-router-dom';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';

if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
  throw new Error();
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderStatus = useSelector(getOrderStatus);
  const clientSecret = useSelector(getClientSecret);
  const cartTotal = useSelector(getCartTotal);
  const payment = useSelector(getPaymentSelector);
  const loading = useSelector(getPaymentLoading);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder({ orderId }));
      dispatch(getPayment({ orderId }));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (
      orderStatus &&
      orderStatus === OrderStatus.AWAITING_PAYMENT &&
      payment?.paymentIntentId
    ) {
      dispatch(
        retrievePaymentIntent({ paymentIntentId: payment.paymentIntentId })
      );
    }
  }, [dispatch, orderStatus, payment?.paymentIntentId]);

  useEffect(() => {
    if (orderId && cartTotal && !payment) {
      dispatch(createPayment({ orderId, amount: cartTotal }));
    }
  }, [dispatch, orderId, cartTotal, payment]);

  if (orderStatus && orderStatus !== OrderStatus.AWAITING_PAYMENT) {
    return <Navigate to={RoutePath.NOT_FOUND} replace />;
  }

  return (
    <Wrapper heading="Checkout">
      {loading === 'succeeded' && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, loader: 'never' }}
        >
          <PaymentForm />
        </Elements>
      )}
    </Wrapper>
  );
};

export default Checkout;
