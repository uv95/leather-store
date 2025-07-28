import { memo, useMemo } from 'react';
import ListItemLayout, {
  ListItemTheme,
} from '../../../shared/ui/ListItemLayout/ListItemLayout';
import './myOrderListItem.scss';
import MyOrderDetails from '../../../components/UserProfile/Content/MyOrders/MyOrderDetails/MyOrderDetails';
import OrderStatusBadge from '../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import { Order, OrderStatus } from '../../../entities/Order';

type MyOrderListItemProps = {
  order: Order;
};

const MyOrderListItem = ({ order }: MyOrderListItemProps) => {
  const { _id: orderId, createdAt, status } = order;

  const orderData: Record<string, string> = useMemo(
    () => ({
      number: `№ ${orderId?.slice(0, 8)}`,
      createdAt: `Created ${new Date(createdAt).toLocaleDateString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
      })}`,
      status,
    }),
    [orderId, status, createdAt]
  );

  return (
    <ListItemLayout
      Details={<MyOrderDetails order={order} />}
      theme={ListItemTheme.WHITE}
    >
      <div
        className="myOrderListItem"
        style={{
          gridTemplateColumns: `repeat(${Object.keys(orderData).length}, 1fr)`,
        }}
      >
        {Object.keys(orderData).map((dataKey) => (
          <div key={dataKey} className={`myOrderListItem__field`}>
            {dataKey === 'status' ? (
              <OrderStatusBadge status={orderData.status as OrderStatus} />
            ) : (
              <div className="myOrderListItem__field-content">
                {orderData[dataKey]}
              </div>
            )}
          </div>
        ))}
      </div>
    </ListItemLayout>
  );
};

export default memo(MyOrderListItem);
