import { AdminOrder } from '../../../../entities/Order';
import { SelectedItemColors } from '../../../../features/cart';
import ChangeStatus from '../ChangeStatus/ChangeStatus';
import styles from './OrderDetails.module.scss';

type OrderDetailsProps = { order: AdminOrder };

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { orderItems, address, _id: orderId, status, user } = order;

  return (
    <div className={styles.OrderDetails}>
      <div className={styles.items}>
        {orderItems.map((orderItem) => (
          <div key={orderItem._id} className={styles.item}>
            <div className={styles.left}>
              <img
                src={orderItem.item.imageCover.url}
                alt={orderItem.item.name || ''}
              />
              <div className={styles.info}>
                <h3>{orderItem.item.name}</h3>
                <p>Leather type: {orderItem.leatherType}</p>
                <SelectedItemColors
                  leatherColor={orderItem.colors.leather}
                  threadColor={orderItem.colors.thread}
                />
                <p className={styles.quantity}>
                  Quantity: {orderItem.quantity}
                </p>
                <p className={styles.price}>Price: ${orderItem.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dl className={styles.userInfo}>
        <dt>
          Delivery address:{' '}
          <dd>
            {address.city}, {address.address},{address.zipcode}
          </dd>
        </dt>
        <dt>
          Client: <dd>{user.name}</dd>
        </dt>
        <dt>
          Contacts:{' '}
          <dd>
            <a href={`mailto:${user.email}`}>{user.email}</a>
            {', '}
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </dd>
        </dt>
      </dl>
      <ChangeStatus currentStatus={status} orderId={orderId} />
    </div>
  );
};

export default OrderDetails;
