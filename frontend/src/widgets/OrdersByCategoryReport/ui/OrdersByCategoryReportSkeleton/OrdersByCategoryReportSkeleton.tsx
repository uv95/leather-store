import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './OrdersByCategoryReportSkeleton.module.scss';

const OrdersByCategoryReportSkeleton = () => {
  return (
    <div className={styles.OrdersByCategoryReportSkeleton}>
      <Skeleton className={styles.title} width={14} height={2.4} />
      <div className={styles.chart}>
        <div className={styles.circleContainer}>
          <Skeleton className={styles.circle} />
        </div>
        <Skeleton width={18} height={6} />
      </div>
    </div>
  );
};

export default OrdersByCategoryReportSkeleton;
