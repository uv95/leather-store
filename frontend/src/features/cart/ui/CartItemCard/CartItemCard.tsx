import { memo, useState } from 'react';
import { CartItem } from '../../../../entities/Cart';
import { ReactComponent as Delete } from '../../../../shared/assets/icons/trash.svg';
import Button, { ButtonColor } from '../../../../shared/ui/Button/Button';
import Colors from '../../../../shared/ui/Colors/Colors';
import Quantity from '../../../../shared/ui/Quantity/Quantity';
import './cartItemCard.scss';

interface CartItemCardProps {
  item: CartItem;
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
    item,
    onDelete,
    onIncreaseQuantity,
    onReduceQuantity,
  }: CartItemCardProps) => {
    const { item: itemData, colors, leather, _id: itemId } = item;
    const [quantity, setQuantity] = useState(item.quantity);

    return (
      <div className="cart-item">
        <div className="cart-item__left">
          <img
            src={itemData.imageCover.url}
            alt={itemData.name || ''}
            className="cart-item__left-img"
          />
          <div className="cart-item__left__info">
            <h2 className="cart-item__left__info-title">{itemData.name}</h2>
            <p>Leather type: {leather}</p>
            <Colors
              leatherColor={colors.leatherColor}
              threadColor={colors.threadsColor}
            />
            <div className="cart-item__left__info__qty">
              <Quantity
                onDecrement={() =>
                  onReduceQuantity(itemId, setQuantity, quantity)
                }
                onIncrement={() =>
                  onIncreaseQuantity(itemId, setQuantity, quantity)
                }
                quantity={quantity}
              />
              <p className="cart-item__left__info__qty-price">
                ${itemData.price * quantity}
              </p>
            </div>
          </div>
        </div>
        <div className="cart-item__right">
          <div className="cart-item__right-remove">
            <Delete onClick={() => onDelete(item._id!)} />
            <Button
              onClick={() => onDelete(item._id!)}
              color={ButtonColor.BLACK}
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
