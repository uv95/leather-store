import React, { useCallback, useState } from 'react';
import { cancelOrder, Order } from '../../../../entities/Order';
import { useAppDispatch } from '../../../../hooks';
import toast from '../../../../shared/lib/toast/toast';
import Button from '../../../../shared/ui/Button/Button';
import Colors from '../../../../shared/ui/Colors/Colors';
import { ConfirmationModal } from '../../../../widgets/ConfirmationModal';
import './userOrderDetails.scss';

type UserOrderDetailsProps = { order: Order };

const UserOrderDetails = React.memo(({ order }: UserOrderDetailsProps) => {
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
      dispatch(cancelOrder(orderId))
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
          confirmAction={() => handleCancelOrder(order._id!)}
          text="Are you sure you want to cancel the order?"
        />
      )}
      <div className="userOrderDetails">
        {order.items.map((item) => (
          <div key={item.name} className="userOrderDetails__item">
            <div className="userOrderDetails__item-left">
              <img
                src={item.imageCover}
                alt={item.name}
                className="userOrderDetails__item-left-img"
              />
              <div className="userOrderDetails__item-left__info">
                <h2 className="userOrderDetails__item-left__info-title">
                  {item.name}
                </h2>
                <p>Leather type: {item.leather}</p>
                <Colors
                  leatherColor={item.colors.leatherColor}
                  threadColor={item.colors.threadsColor}
                  fromMyOrders
                />
                <p className="userOrderDetails__item-left__info-qty">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="userOrderDetails__item-right">
              ${item.price * item.quantity}
            </p>
          </div>
        ))}

        <p className="userOrderDetails__address">
          Delivery address: {order.address.city}, {order.address.address},
          {order.address.zipcode}
        </p>

        <div className="userOrderDetails__bottom">
          <div className="userOrderDetails__bottom-total">
            <p>Total: ${order.total}</p>
          </div>
          {order.status !== 'Completed' && (
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
