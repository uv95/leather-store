import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';
import styles from './PaymentFormSkeleton.module.scss';

const PaymentFormSkeleton = () => {
  return (
    <>
      <Skeleton
        className={styles.paymentElement}
        data-testid="payment-skeleton"
      />
      <Skeleton width={14} height={5.3} className={styles.button} />
    </>
  );
};

export default PaymentFormSkeleton;
