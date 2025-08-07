import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './ItemInfoSkeleton.module.scss';

const ItemInfoSkeleton = () => {
  return (
    <div className={styles.ItemInfoSkeleton}>
      <Skeleton width={10} height={3.5} className={styles.title} />
      <Skeleton width={4.5} height={3.5} className={styles.price} />
      <Skeleton width={41} height={2.5} className={styles.leatherType} />
      <Skeleton width={20.5} height={6.8} className={styles.colors} />
      <Skeleton width={7} height={1.8} className={styles.descriptionHeading} />
      <Skeleton width={50} height={3.6} className={styles.description} />
      <Skeleton width={15.5} height={5.3} className={styles.button} />
    </div>
  );
};

export default ItemInfoSkeleton;
