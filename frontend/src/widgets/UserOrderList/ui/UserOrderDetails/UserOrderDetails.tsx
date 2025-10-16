import React, { useCallback, useEffect, useState } from 'react';
import {
  deleteOrder,
  OrderStatus,
  UserOrder,
} from '../../../../entities/Order';
import { SelectedItemColors } from '../../../../features/cart';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import Button, { ButtonTheme } from '../../../../shared/ui/Button/Button';
import { ConfirmationModal } from '../../../../shared/ui/ConfirmationModal';
import styles from './UserOrderDetails.module.scss';
import { getPayment } from '../../../../features/payment';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/types/routePaths';

type UserOrderDetailsProps = { order: UserOrder };

const UserOrderDetails = React.memo(({ order }: UserOrderDetailsProps) => {
  const { _id: orderId, address, total, status, orderItems } = order;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancelOrder = useCallback(
    (orderId: string) => {
      dispatch(deleteOrder({ orderId }))
        .unwrap()
        .then(() => toast.success('Order canceled'))
        .catch((error) => toast.error(error));
    },
    [dispatch]
  );

  useEffect(() => {
    if (status === OrderStatus.AWAITING_PAYMENT) {
      dispatch(getPayment({ orderId }));
    }
  }, [dispatch, orderId]);

  const makePayment = useCallback(() => {
    navigate(`${RoutePath.CHECKOUT}?orderId=${orderId}`);
  }, [navigate, orderId]);

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          confirmAction={() => handleCancelOrder(orderId)}
          text="Are you sure you want to cancel the order?"
        />
      )}
      <div className={styles.UserOrderDetails}>
        {orderItems.map((orderItem) => (
          <div key={orderItem._id} className={styles.item}>
            <div className={styles.itemInfoContainer}>
              <img
                src={orderItem.item.imageCover.url}
                alt={orderItem.item.name}
                className={styles.imageCover}
              />
              <div className={styles.itemInfo}>
                <h2 className={styles.itemTitle}>{orderItem.item.name}</h2>
                <p>Leather type: {orderItem.leatherType}</p>
                <SelectedItemColors
                  leatherColor={orderItem.colors.leather}
                  threadColor={orderItem.colors.thread}
                />
                <p className={styles.itemQuantity}>
                  Quantity: {orderItem.quantity}
                </p>
              </div>
            </div>
            <p className={styles.itemTotal}>
              ${orderItem.price * orderItem.quantity}
            </p>
          </div>
        ))}

        <p className={styles.address}>
          Delivery address: {address.city}, {address.address},{address.zipcode}
        </p>

        <div className={styles.bottom}>
          <div className={styles.orderTotal}>
            <p>Total: ${total}</p>
          </div>
          {status !== OrderStatus.COMPLETED && (
            <div className={styles.buttons}>
              {status === OrderStatus.AWAITING_PAYMENT && (
                <Button theme={ButtonTheme.BLACK} onClick={makePayment}>
                  Make Payment
                </Button>
              )}

              <Button onClick={onOpenModal}>Cancel order</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default UserOrderDetails;
