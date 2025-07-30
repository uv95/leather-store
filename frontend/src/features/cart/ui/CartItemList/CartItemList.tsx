import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CartItem, getCartSelector } from '../../../../entities/Cart';
import useDeleteCartItem from '../../api/useDeleteCartItem';
import CartItemCard from '../CartItemCard/CartItemCard';
import './cartItemList.scss';
import useChangeQuantity from '../../api/useChangeQuantity';

interface CartItemListProps {}

const CartItemList = ({}: CartItemListProps) => {
  const cart = useSelector(getCartSelector);
  const deleteCartItem = useDeleteCartItem();
  const changeItemQuantity = useChangeQuantity();

  const increaseQuantity = useCallback(
    (id: string, setQuantity: (arg: number) => void, quantity: number) => {
      setQuantity(quantity + 1);
      changeItemQuantity(id, { quantity: quantity + 1 });
    },
    [changeItemQuantity]
  );

  const reduceQuantity = useCallback(
    (id: string, setQuantity: (arg: number) => void, quantity: number) => {
      if (quantity === 1) {
        deleteCartItem(id);
        return;
      }
      setQuantity(quantity - 1);
      changeItemQuantity(id, { quantity: quantity - 1 });
    },
    [changeItemQuantity, deleteCartItem]
  );

  return (
    <div className="cartItemList">
      <div className="cartItemList__items">
        {cart?.items.map((item: CartItem) => (
          <CartItemCard
            key={item._id}
            item={item}
            onDelete={deleteCartItem}
            onIncreaseQuantity={increaseQuantity}
            onReduceQuantity={reduceQuantity}
          />
        ))}
      </div>
      <div className="cartItemList-total">
        <p>Total: ${cart?.total}</p>
      </div>
    </div>
  );
};

export default CartItemList;
