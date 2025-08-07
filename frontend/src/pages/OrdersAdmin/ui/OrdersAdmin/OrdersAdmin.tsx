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
          {!allOrders.length && <p>No orders</p>}
          {activeOrders.length !== 0 && (
            <h1 className="orders-heading">Active</h1>
          )}
          {activeOrders.map((order) => (
            <OrdersAdminListItem key={order._id} order={order} />
          ))}
          {completedOrders.length !== 0 && (
            <h1 className="orders-heading">Completed</h1>
          )}
          {completedOrders.map((order) => (
            <OrdersAdminListItem key={order._id} order={order} />
          ))}
        </>
      )}
    </div>
  );
};

export default OrdersAdmin;
