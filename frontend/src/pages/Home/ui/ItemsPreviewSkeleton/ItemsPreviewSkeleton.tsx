import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './ItemsPreviewSkeleton.module.scss';

const ItemsPreviewSkeleton = () => {
  return (
    <>
      <div className={styles.skeleton}>
        <Skeleton className={styles.imageSekeleton} />
        <Skeleton height={2} />
      </div>
      <div className={styles.skeleton}>
        <Skeleton className={styles.imageSekeleton} />
        <Skeleton height={2} />
      </div>
      <div className={styles.skeleton}>
        <Skeleton className={styles.imageSekeleton} />
        <Skeleton height={2} />
      </div>
      <div className={styles.skeleton}>
        <Skeleton className={styles.imageSekeleton} />
        <Skeleton height={2} />
      </div>
    </>
  );
};

export default ItemsPreviewSkeleton;
