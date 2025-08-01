import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getAllActiveOrders,
  getAllCompletedOrders,
  getAllOrders,
  getOrderIsLoading,
} from '../../entities/Order';
import Spinner from '../../shared/ui/Spinner/Spinner';
import { OrdersAdminListItem } from '../../widgets/OrdersAdminListItem';
import './ordersAdmin.scss';
import toast from '../../shared/lib/toast/toast';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';

const OrdersAdmin = () => {
  const dispatch = useAppDispatch();

  const activeOrders = useSelector(getAllActiveOrders);
  const completedOrders = useSelector(getAllCompletedOrders);
  const isLoading = useSelector(getOrderIsLoading);

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then()
      .catch((error) => toast.error(error));
  }, [dispatch]);

  return (
    <div className="orders">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!activeOrders.length && !completedOrders.length && <p>No orders</p>}
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
