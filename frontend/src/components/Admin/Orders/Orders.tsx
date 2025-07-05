import useGetOrders from '../../../hooks/useGetOrders';
import { IOrder } from '../../../types/data';
import { orderStatuses } from '../../../utils/consts';
import ListItem from '../../UI/ListItem/ListItem';
import Spinner from '../../UI/Spinner/Spinner';
import OrderDetails from './OrderDetails/OrderDetails';
import './orders.scss';

type Props = {};

const Orders = (props: Props) => {
  const { activeOrders, finishedOrders, isLoading } = useGetOrders();
  const orderData = (order: IOrder) => [
    {
      dataItem: new Date(order.createdAt!).toLocaleDateString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
      }),
    },
    { dataItem: order.user.name },
    { dataItem: order.address.city },
    { dataItem: order.total + ' RUB' },
    {
      dataItem: order.status,
      style: orderStatuses.find(({ status }) => status === order.status)?.style,
    },
  ];

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
            <ListItem
              key={order._id}
              Details={<OrderDetails order={order} />}
              bg="grey"
              data={orderData(order)}
            />
          ))}
          {finishedOrders.length !== 0 && (
            <h1 className="orders-heading">Completed</h1>
          )}
          {finishedOrders.map((order) => (
            <ListItem
              key={order._id}
              Details={<OrderDetails order={order} />}
              bg="grey"
              data={orderData(order)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Orders;
