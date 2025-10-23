import { memo, useState } from 'react';
import { CartItem } from '../../../../entities/Cart';
import { ReactComponent as Delete } from '../../../../shared/assets/icons/trash.svg';
import Button, { ButtonTheme } from '../../../../shared/ui/Button/Button';
import Quantity from '../../../../shared/ui/Quantity/Quantity';
import SelectedItemColors from '../SelectedItemColors/SelectedItemColors';
import styles from './CartItemCard.module.scss';

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
      <div className={styles.CartItemCard}>
        <div className={styles.left}>
          <img
            src={item.imageCover.url}
            alt={item.name || ''}
            className={styles.imageCover}
          />
          <div className={styles.itemInfo}>
            <h2 className={styles.title}>{item.name}</h2>
            <p>Leather type: {leatherType}</p>
            <SelectedItemColors
              leatherColor={colors.leather}
              threadColor={colors.thread}
            />
            <div className={styles.quantityAndCost}>
              <Quantity
                onDecrement={() =>
                  onReduceQuantity(cartItem._id, setQuantity, quantity)
                }
                onIncrement={() =>
                  onIncreaseQuantity(cartItem._id, setQuantity, quantity)
                }
                quantity={quantity}
              />
              <p className={styles.cost}>${price * quantity}</p>
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <Delete onClick={() => onDelete(cartItem._id)} />
          <Button
            onClick={() => onDelete(cartItem._id)}
            theme={ButtonTheme.BLACK}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  }
);

export default CartItemCard;
