import React, { useCallback, useState } from 'react';
import { useCancelOrder } from '../../../../../hooks/useCancelOrder';
import { IOrder } from '../../../../../types/data';
import Button from '../../../../../shared/ui/Button/Button';
import Colors from '../../../../../shared/ui/Colors/Colors';
import Modal from '../../../../../shared/ui/Modal/Modal';
import './myOrderDetails.scss';

type MyOrderDetailsProps = { order: IOrder };

const MyOrderDetails = React.memo(({ order }: MyOrderDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cancelOrder = useCancelOrder();

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          <>
            <p>Are you sure you want to cancel the order?</p>
            <div className="modal__content__buttons">
              <Button
                onClick={() => {
                  cancelOrder(order._id!);
                  setIsModalOpen(false);
                }}
              >
                Yes
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>No</Button>
            </div>
          </>
        </Modal>
      )}
      <div className="myOrderDetails">
        {order.items.map((item) => (
          <div key={item.name} className="myOrderDetails__item">
            <div className="myOrderDetails__item-left">
              <img
                src={item.imageCover}
                alt={item.name}
                className="myOrderDetails__item-left-img"
              />
              <div className="myOrderDetails__item-left__info">
                <h2 className="myOrderDetails__item-left__info-title">
                  {item.name}
                </h2>
                <p>Leather type: {item.leather}</p>
                <Colors
                  leatherColor={item.colors.leatherColor}
                  threadColor={item.colors.threadsColor}
                  fromMyOrders
                />
                <p className="myOrderDetails__item-left__info-qty">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="myOrderDetails__item-right">
              ${item.price * item.quantity}
            </p>
          </div>
        ))}

        <p className="myOrderDetails__address">
          Delivery address: {order.address.city}, {order.address.address},
          {order.address.zipcode}
        </p>

        <div className="myOrderDetails__bottom">
          <div className="myOrderDetails__bottom-total">
            <p>Total: ${order.total}</p>
          </div>
          {order.status !== 'Completed' && (
            <div className="myOrderDetails__bottom-btns">
              <Button onClick={onOpenModal}>Cancel order</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default MyOrderDetails;
