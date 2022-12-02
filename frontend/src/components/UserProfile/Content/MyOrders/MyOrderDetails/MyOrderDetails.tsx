import React, { useState } from 'react';
import './myOrderDetails.scss';
import Colors from '../../../../UI/Colors/Colors';
import Button from '../../../../UI/Button/Button';
import { IOrder } from '../../../../../types/data';
import { useCancelOrder } from '../../../../../hooks/useCancelOrder';
import Modal from '../../../../UI/Modal/Modal';

type MyOrderDetailsProps = { order: IOrder };

const MyOrderDetails = ({ order }: MyOrderDetailsProps) => {
  const [openModal, setOpenModal] = useState(false);
  const cancelOrder = useCancelOrder();

  return (
    <>
      {openModal && (
        <Modal
          setOpen={setOpenModal}
          Content={
            <>
              <p>Вы действительно хотите отменить заказ?</p>
              <div className="modal__content__buttons">
                <Button
                  text="Да"
                  color="grey"
                  onClick={() => {
                    cancelOrder(order._id!);
                    setOpenModal(false);
                  }}
                />
                <Button
                  text="Нет"
                  color="grey"
                  onClick={() => setOpenModal(false)}
                />
              </div>
            </>
          }
        />
      )}
      <div className="myOrderDetails">
        {order.items.map((item) => (
          <div key={item._id} className="myOrderDetails__item">
            <div className="myOrderDetails__item-left">
              <img
                src={require(`../../../../../assets/img/items/${item.imageCover}`)}
                alt="Фото товара"
                className="myOrderDetails__item-left-img"
              />
              <div className="myOrderDetails__item-left__info">
                <h2 className="myOrderDetails__item-left__info-title">
                  {item.name}
                </h2>
                <p>Тип кожи: {item.leather}</p>
                <Colors
                  leatherColor={item.colors.leatherColor}
                  threadsColor={item.colors.threadsColor}
                />
                <p className="myOrderDetails__item-left__info-qty">
                  Количество: {item.quantity}
                </p>
              </div>
            </div>
            <div className="myOrderDetails__item-right">
              {item.price * item.quantity} руб.
            </div>
          </div>
        ))}

        <div className="myOrderDetails__address">
          Адрес доставки: {order.address.city}, {order.address.address},
          {order.address.zipcode}
        </div>

        <div className="myOrderDetails__bottom">
          <div className="myOrderDetails__bottom-total">
            <p>Итого: {order.total} руб.</p>
          </div>
          {order.status !== 'Выполнен' && (
            <div className="myOrderDetails__bottom-btns">
              <Button
                text="Отменить заказ"
                color="gray"
                onClick={() => setOpenModal(true)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrderDetails;
