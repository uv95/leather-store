import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './PaymentFormSkeleton.module.scss';

interface PaymentFormSkeletonProps {}

const PaymentFormSkeleton = ({}: PaymentFormSkeletonProps) => {
  return (
    <>
      <Skeleton className={styles.paymentElement} />
      <Skeleton width={14} height={5.3} className={styles.button} />
    </>
  );
};

export default PaymentFormSkeleton;
