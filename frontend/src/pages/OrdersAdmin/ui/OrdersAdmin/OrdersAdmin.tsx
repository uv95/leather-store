import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getAllActiveOrders,
  getAllCompletedOrders,
  getAllOrders,
  getAllOrdersSelector,
  getOrderLoading,
} from '../../../../entities/Order';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import OrdersAdminListItem from '../OrdersAdminListItem/OrdersAdminListItem';
import OrdersAdminSkeleton from '../OrdersAdminSkeleton/OrdersAdminSkeleton';
import './ordersAdmin.scss';

const OrdersAdmin = () => {
  const dispatch = useAppDispatch();
  const allOrders = useSelector(getAllOrdersSelector);
  const activeOrders = useSelector(getAllActiveOrders);
  const completedOrders = useSelector(getAllCompletedOrders);
  const loading = useSelector(getOrderLoading);

  useEffect(() => {
    if (!allOrders.length) {
      dispatch(getAllOrders())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, allOrders.length]);

  return (
    <div className="orders">
      {loading === 'pending' && <OrdersAdminSkeleton />}

      {loading === 'succeeded' && (
        <>
          {!allOrders.length && <p role="status">No orders</p>}
          {activeOrders.length !== 0 && (
            <section aria-labelledby="active-orders-heading">
              <h2 id="active-orders-heading" className="orders-heading">
                Active
              </h2>
              <ul>
                {activeOrders.map((order) => (
                  <li key={order._id}>
                    <OrdersAdminListItem order={order} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {completedOrders.length !== 0 && (
            <section aria-labelledby="completed-orders-heading">
              <h2 id="completed-orders-heading" className="orders-heading">
                Completed
              </h2>
              <ul>
                {completedOrders.map((order) => (
                  <li key={order._id}>
                    <OrdersAdminListItem order={order} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersAdmin;
