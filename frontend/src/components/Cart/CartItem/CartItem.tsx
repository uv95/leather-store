import React from 'react';
import './cartItem.scss';
import { ReactComponent as Delete } from '../../../assets/icons/trash.svg';
import black from '../../../assets/img/black.jpg';
import { ICartItem } from '../../../types/data';
import { useAddToCart } from '../../../hooks/useAddToCart';
import { useReduceQuantity } from '../../../hooks/useReduceQuantity';
import { useDeleteCartItem } from '../../../hooks/useDeleteCartItem';
import Quantity from '../../UI/Quantity/Quantity';
import Colors from '../../UI/Colors/Colors';

type CartItemProps = { item: ICartItem };

const CartItem = ({ item }: CartItemProps) => {
  const addItemToCart = useAddToCart();
  const deleteCartItem = useDeleteCartItem();
  const reduceItemQuantity = useReduceQuantity();

  return (
    <div className="cart-item">
      <div className="cart-item__left">
        <img
          src={require(`../../../assets/img/items/${item.imageCover}`)}
          alt="Фото товара"
          className="cart-item__left-img"
        />
        <div className="cart-item__left__info">
          <h2 className="cart-item__left__info-title">{item.name}</h2>
          <p>Тип кожи: {item.leather}</p>
          <Colors leatherColor={black} threadsColor={black} />
          <div className="cart-item__left__info__qty">
            <Quantity
              reduce={() => reduceItemQuantity(item._id!)}
              increase={() => addItemToCart(item)}
              quantity={item.quantity}
            />
            <p className="cart-item__left__info__qty-price">
              {item.price * item.quantity} руб.
            </p>
          </div>
        </div>
      </div>
      <div className="cart-item__right">
        <div className="cart-item__right-remove">
          <Delete onClick={() => deleteCartItem(item._id!)} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
