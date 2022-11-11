import React from 'react';
import { useAppDispatch } from '../hooks';
import { addOrder } from '../features/order/orderSlice';
import { IOrder } from '../types/data';
import { emptyCart } from '../features/cart/cartSlice';

export function useCreateOrder() {
  const dispatch = useAppDispatch();

  const createOrder = (order: IOrder) => {
    dispatch(addOrder(order))
      .unwrap()
      .then((data) => console.log(data, 'ORDER'))
      .catch((error) => console.log(error, 'ERROR'));

    dispatch(emptyCart())
      .unwrap()
      .then((data) => console.log(data, 'empty cart'))
      .catch((error) => console.log(error, 'ERROR'));
  };

  return createOrder;
}

export default useCreateOrder;
