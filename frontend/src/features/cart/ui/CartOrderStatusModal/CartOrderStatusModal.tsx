import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderLoading } from '../../../../entities/Order';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import Modal from '../../../../shared/ui/Modal/Modal';
import styles from './cartOrderStatusModal.module.scss';

interface CartOrderStatusModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const CartOrderStatusModal = memo(
  ({ onClose, isOpen }: CartOrderStatusModalProps) => {
    const loading = useSelector(getOrderLoading);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        {loading === 'pending' && (
          <p className={styles.text}>Placing order...</p>
        )}

        {loading === 'failed' && (
          <p className={styles.text}>
            An error occurred! Please reload the page and try again.
          </p>
        )}

        {loading === 'succeeded' && (
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
