import { memo } from 'react';
import { UserOrder } from '../../../../entities/Order';
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

  return (
    <ListItemLayout
      Details={<UserOrderDetails order={order} />}
      theme={ListItemTheme.WHITE}
      label={`Order №${orderId?.slice(0, 8)}`}
    >
      <dl
        className={styles.UserOrderListItem}
        style={{
          gridTemplateColumns: `repeat(3, 1fr)`,
        }}
      >
        <div className={styles.field}>
          <dt className="sr-only">Order number</dt>
          <dd className={styles.content}>№ {orderId?.slice(0, 8)}</dd>
        </div>
        <div className={styles.field}>
          <dt className="sr-only">Created</dt>
          <dd className={styles.content}>
            {new Date(createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </dd>
        </div>
        <div className={styles.field}>
          <dt className="sr-only">Status</dt>
          <dd>
            <OrderStatusBadge status={status} />
          </dd>
        </div>
      </dl>
    </ListItemLayout>
  );
};

export default memo(UserOrderListItem);
