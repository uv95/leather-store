import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import Modal from '../../../../shared/ui/Modal/Modal';
import { useSelector } from 'react-redux';
import { getOrderIsError } from '../../../../entities/Order/model/selectors/getOrderIsError/getOrderIsError';
import { getOrderIsLoading } from '../../../../entities/Order';
import styles from './cartOrderStatusModal.module.scss';

interface CartOrderStatusModalProps {
  onClose: () => void;
  isOpen: boolean;
  isCartEmpty: boolean;
}

const CartOrderStatusModal = memo(
  ({ onClose, isOpen, isCartEmpty }: CartOrderStatusModalProps) => {
    const isError = useSelector(getOrderIsError);
    const isLoading = useSelector(getOrderIsLoading);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        {isLoading && !isCartEmpty ? (
          <p className={styles.text}>Placing order...</p>
        ) : isError ? (
          <p className={styles.text}>
            An error occurred! Please reload the page and try again.
          </p>
        ) : (
          <p className={styles.text}>
            Order created! Go to{' '}
            <Link className="redLink" to={RoutePath.USER_PROFILE}>
              your account.
            </Link>
          </p>
        )}
      </Modal>
    );
  }
);

export default CartOrderStatusModal;
