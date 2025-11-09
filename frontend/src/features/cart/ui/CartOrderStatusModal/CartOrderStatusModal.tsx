import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentOrderId, getOrderLoading } from '../../../../entities/Order';
import Modal from '../../../../shared/ui/Modal/Modal';
import styles from './cartOrderStatusModal.module.scss';

interface CartOrderStatusModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const CartOrderStatusModal = memo(
  ({ onClose, isOpen }: CartOrderStatusModalProps) => {
    const loading = useSelector(getOrderLoading);
    const orderId = useSelector(getCurrentOrderId);
    const navigate = useNavigate();

    useEffect(() => {
      if (loading === 'succeeded') {
        setTimeout(() => {
          navigate(`/checkout?orderId=${orderId}`);
        }, 1500);
      }
    }, [loading]);

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
            Order created! You are being redirected to the payment page.
          </p>
        )}
      </Modal>
    );
  }
);

export default CartOrderStatusModal;
