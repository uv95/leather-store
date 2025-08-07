import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './MonthleRevenueReportSkeleton.module.scss';

const MonthleRevenueReportSkeleton = () => {
  return (
    <div className={styles.MonthleRevenueReportSkeleton}>
      <Skeleton className={styles.title} width={14} height={2.4} />
      <Skeleton className={styles.chart} />
    </div>
  );
};

export default MonthleRevenueReportSkeleton;
