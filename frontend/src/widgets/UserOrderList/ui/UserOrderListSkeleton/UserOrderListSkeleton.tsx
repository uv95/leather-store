import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './UserOrderListSkeleton.module.scss';

const UserOrderListSkeleton = () => {
  return (
    <div className={styles.UserOrderListSkeleton}>
      <Skeleton className={styles.heading} width={10} height={2.4} />
      <div className={styles.underline}></div>
      <Skeleton className={styles.card} height={10} />
      <Skeleton className={styles.card} height={10} />
      <Skeleton className={styles.card} height={10} />
    </div>
  );
};

export default UserOrderListSkeleton;
