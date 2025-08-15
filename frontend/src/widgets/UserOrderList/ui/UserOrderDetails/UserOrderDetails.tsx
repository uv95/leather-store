import React, { useCallback, useState } from 'react';
import { deleteOrder, UserOrder } from '../../../../entities/Order';
import { SelectedItemColors } from '../../../../features/cart';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import Button from '../../../../shared/ui/Button/Button';
import { ConfirmationModal } from '../../../../shared/ui/ConfirmationModal';
import './userOrderDetails.scss';

type UserOrderDetailsProps = { order: UserOrder };

const UserOrderDetails = React.memo(({ order }: UserOrderDetailsProps) => {
  const { _id: orderId, address, total, status, orderItems } = order;
  const dispatch = useAppDispatch();
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
      <div className="userOrderDetails">
        {orderItems.map((orderItem) => (
          <div key={orderItem._id} className="userOrderDetails__item">
            <div className="userOrderDetails__item-left">
              <img
                src={orderItem.item.imageCover.url}
                alt={orderItem.item.name}
                className="userOrderDetails__item-left-img"
              />
              <div className="userOrderDetails__item-left__info">
                <h2 className="userOrderDetails__item-left__info-title">
                  {orderItem.item.name}
                </h2>
                <p>Leather type: {orderItem.leatherType}</p>
                <SelectedItemColors
                  leatherColor={orderItem.colors.leather}
                  threadColor={orderItem.colors.thread}
                />
                <p className="userOrderDetails__item-left__info-qty">
                  Quantity: {orderItem.quantity}
                </p>
              </div>
            </div>
            <p className="userOrderDetails__item-right">
              ${orderItem.price * orderItem.quantity}
            </p>
          </div>
        ))}

        <p className="userOrderDetails__address">
          Delivery address: {address.city}, {address.address},{address.zipcode}
        </p>

        <div className="userOrderDetails__bottom">
          <div className="userOrderDetails__bottom-total">
            <p>Total: ${total}</p>
          </div>
          {status !== 'Completed' && (
            <div className="userOrderDetails__bottom-btns">
              <Button onClick={onOpenModal}>Cancel order</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default UserOrderDetails;
