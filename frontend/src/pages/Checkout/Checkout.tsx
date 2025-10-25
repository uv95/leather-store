import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { getCartTotal } from '../../entities/Cart';
import { getOrder, getOrderStatus, OrderStatus } from '../../entities/Order';
import {
  createPayment,
  getClientSecret,
  getPayment,
  getPaymentIntentId,
  getPaymentLoading,
  PaymentForm,
  retrievePaymentIntent,
} from '../../features/payment';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';
import { RoutePath } from '../../shared/types/routePaths';
import Wrapper from '../../shared/ui/Wrapper/Wrapper';

const Checkout = () => {
  if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
    throw new Error();
  }

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderStatus = useSelector(getOrderStatus);
  const clientSecret = useSelector(getClientSecret);
  const cartTotal = useSelector(getCartTotal);
  const paymentIntentId = useSelector(getPaymentIntentId);
  const loading = useSelector(getPaymentLoading);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder({ orderId }))
        .unwrap()
        .then(() => {
          !paymentIntentId && dispatch(getPayment({ orderId }));
        });
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (orderStatus === OrderStatus.AWAITING_PAYMENT && paymentIntentId) {
      dispatch(retrievePaymentIntent({ paymentIntentId }));
    }
  }, [dispatch, orderStatus, paymentIntentId]);

  useEffect(() => {
    if (orderId && cartTotal && !paymentIntentId) {
      dispatch(createPayment({ orderId, amount: cartTotal }));
    }
  }, [dispatch, orderId, cartTotal, paymentIntentId]);

  if (orderStatus && orderStatus !== OrderStatus.AWAITING_PAYMENT) {
    return <Navigate to={RoutePath.NOT_FOUND} replace />;
  }

  return (
    <Wrapper heading="Checkout">
      {loading === 'succeeded' && clientSecret && (
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
