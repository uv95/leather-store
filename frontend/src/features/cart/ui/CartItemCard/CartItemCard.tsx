import { memo, useState } from 'react';
import { CartItem } from '../../../../entities/Cart';
import { ReactComponent as Delete } from '../../../../shared/assets/icons/trash.svg';
import Button, { ButtonTheme } from '../../../../shared/ui/Button/Button';
import Quantity from '../../../../shared/ui/Quantity/Quantity';
import SelectedItemColors from '../SelectedItemColors/SelectedItemColors';
import './cartItemCard.scss';

interface CartItemCardProps {
  cartItem: CartItem;
  onDelete: (arg: string) => void;
  onIncreaseQuantity: (
    id: string,
    setQuantity: (arg: number) => void,
    quantity: number
  ) => void;
  onReduceQuantity: (
    id: string,
    setQuantity: (arg: number) => void,
    quantity: number
  ) => void;
}

const CartItemCard = memo(
  ({
    cartItem,
    onDelete,
    onIncreaseQuantity,
    onReduceQuantity,
  }: CartItemCardProps) => {
    const { item, colors, leatherType, price } = cartItem;
    const [quantity, setQuantity] = useState(cartItem.quantity);

    return (
      <div className="cart-item">
        <div className="cart-item__left">
          <img
            src={item.imageCover.url}
            alt={item.name || ''}
            className="cart-item__left-img"
          />
          <div className="cart-item__left__info">
            <h2 className="cart-item__left__info-title">{item.name}</h2>
            <p>Leather type: {leatherType}</p>
            <SelectedItemColors
              leatherColor={colors.leather}
              threadColor={colors.thread}
            />
            <div className="cart-item__left__info__qty">
              <Quantity
                onDecrement={() =>
                  onReduceQuantity(cartItem._id, setQuantity, quantity)
                }
                onIncrement={() =>
                  onIncreaseQuantity(cartItem._id, setQuantity, quantity)
                }
                quantity={quantity}
              />
              <p className="cart-item__left__info__qty-price">
                ${price * quantity}
              </p>
            </div>
          </div>
        </div>
        <div className="cart-item__right">
          <div className="cart-item__right-remove">
            <Delete onClick={() => onDelete(cartItem._id)} />
            <Button
              onClick={() => onDelete(cartItem._id)}
              theme={ButtonTheme.BLACK}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default CartItemCard;
