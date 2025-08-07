import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './CartItemListSkeleton.module.scss';

const CartItemListSkeleton = () => {
  return (
    <div className={styles.CartItemListSkeleton}>
      <Skeleton className={styles.item} />
      <Skeleton className={styles.button} width={14.4} height={5.2} />
    </div>
  );
};

export default CartItemListSkeleton;
