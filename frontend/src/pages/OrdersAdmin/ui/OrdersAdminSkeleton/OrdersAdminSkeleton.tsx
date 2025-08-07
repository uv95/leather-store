import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './OrdersAdminSkeleton.module.scss';

const OrdersAdminSkeleton = () => {
  return (
    <div className={styles.OrdersAdminSkeleton}>
      <Skeleton className={styles.title} width={10} height={3.5} />
      <div className={styles.orderList}>
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
      </div>
    </div>
  );
};

export default OrdersAdminSkeleton;
