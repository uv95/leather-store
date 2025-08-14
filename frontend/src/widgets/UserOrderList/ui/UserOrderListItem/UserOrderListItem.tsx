import { memo, useMemo } from 'react';
import { OrderStatus, UserOrder } from '../../../../entities/Order';
import ListItemLayout, {
  ListItemTheme,
} from '../../../../shared/ui/ListItemLayout/ListItemLayout';
import OrderStatusBadge from '../../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import UserOrderDetails from '../UserOrderDetails/UserOrderDetails';
import styles from './UserOrderListItem.module.scss';

type UserOrderListItemProps = {
  order: UserOrder;
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
        className={styles.UserOrderListItem}
        style={{
          gridTemplateColumns: `repeat(${Object.keys(orderData).length}, 1fr)`,
        }}
      >
        {Object.keys(orderData).map((dataKey) => (
          <div key={dataKey} className={styles.field}>
            {dataKey === 'status' ? (
              <OrderStatusBadge status={orderData.status as OrderStatus} />
            ) : (
              <div className={styles.content}>{orderData[dataKey]}</div>
            )}
          </div>
        ))}
      </div>
    </ListItemLayout>
  );
};

export default memo(UserOrderListItem);
