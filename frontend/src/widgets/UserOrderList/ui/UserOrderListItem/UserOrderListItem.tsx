import { memo, useMemo } from 'react';
import { Order, OrderStatus } from '../../../../entities/Order';
import ListItemLayout, {
  ListItemTheme,
} from '../../../../shared/ui/ListItemLayout/ListItemLayout';
import OrderStatusBadge from '../../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import UserOrderDetails from '../UserOrderDetails/UserOrderDetails';
import './userOrderListItem.scss';

type UserOrderListItemProps = {
  order: Order;
};

const UserOrderListItem = ({ order }: UserOrderListItemProps) => {
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
      Details={<UserOrderDetails order={order} />}
      theme={ListItemTheme.WHITE}
    >
      <div
        className="userOrderListItem"
        style={{
          gridTemplateColumns: `repeat(${Object.keys(orderData).length}, 1fr)`,
        }}
      >
        {Object.keys(orderData).map((dataKey) => (
          <div key={dataKey} className={`userOrderListItem__field`}>
            {dataKey === 'status' ? (
              <OrderStatusBadge status={orderData.status as OrderStatus} />
            ) : (
              <div className="userOrderListItem__field-content">
                {orderData[dataKey]}
              </div>
            )}
          </div>
        ))}
      </div>
    </ListItemLayout>
  );
};

export default memo(UserOrderListItem);
