import useGetOrders from '../../hooks/useGetOrders';
import Spinner from '../../shared/ui/Spinner/Spinner';
import { OrdersAdminListItem } from '../../widgets/OrdersAdminListItem';
import './ordersAdmin.scss';

const OrdersAdmin = () => {
  const { activeOrders, finishedOrders, isLoading } = useGetOrders();

  return (
    <div className="orders">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!activeOrders.length && !finishedOrders.length && <p>No orders</p>}
          {activeOrders.length !== 0 && (
            <h1 className="orders-heading">Active</h1>
          )}
          {activeOrders.map((order) => (
            <OrdersAdminListItem key={order._id} order={order} />
          ))}
          {finishedOrders.length !== 0 && (
            <h1 className="orders-heading">Completed</h1>
          )}
          {finishedOrders.map((order) => (
            <OrdersAdminListItem key={order._id} order={order} />
          ))}
        </>
      )}
    </div>
  );
};

export default OrdersAdmin;
