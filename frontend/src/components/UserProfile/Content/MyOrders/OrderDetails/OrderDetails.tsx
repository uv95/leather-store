import React, { useState, useEffect } from 'react';
import './orderDetails.scss';
import black from '../../../../../assets/img/black.jpg';
import Colors from '../../../../UI/Colors/Colors';
import Button from '../../../../UI/Button/Button';
import { IAddress, IOrder } from '../../../../../types/data';
import { useCancelOrder } from '../../../../../hooks/useCancelOrder';
import useGetAllAddresses from '../../../../../hooks/useGetAllAddresses';

type OrderDetailsProps = { order: IOrder };

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { isLoading, addresses } = useGetAllAddresses();
  const [selectedAddress, setSelectedAddress] = useState<IAddress>({
    city: '',
    address: '',
    zipcode: '',
  });
  const cancelOrder = useCancelOrder();

  useEffect(() => {
    if (addresses)
      setSelectedAddress(
        addresses.find((address) => address._id === order.addressId)!
      );
  }, [addresses, order]);

  return (
    <div className="orderDetails">
      {order.items.map((item) => (
        <div key={item._id} className="orderDetails__item">
          <div className="orderDetails__item-left">
            <img
              src={require(`../../../../../assets/img/items/${item.imageCover}`)}
              alt="Фото товара"
              className="orderDetails__item-left-img"
            />
            <div className="orderDetails__item-left__info">
              <h2 className="orderDetails__item-left__info-title">
                {item.name}
              </h2>
              <p>Тип кожи: {item.leather}</p>
              <Colors leatherColor={black} threadsColor={black} />
              <p className="orderDetails__item-left__info-qty">
                Количество: {item.quantity}
              </p>
            </div>
          </div>
          <div className="orderDetails__item-right">
            {item.price * item.quantity} руб.
          </div>
        </div>
      ))}
      {selectedAddress && (
        <div className="orderDetails__address">
          Адрес доставки: {selectedAddress.city}, {selectedAddress.address},
          {selectedAddress.zipcode}
        </div>
      )}
      <div className="orderDetails__bottom">
        <div className="orderDetails__bottom-total">
          <p>Итого: {order.total} руб.</p>
        </div>
        <div className="orderDetails__bottom-btns">
          <Button
            text="Отменить заказ"
            color="gray"
            onClick={() => cancelOrder(order._id!)}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
