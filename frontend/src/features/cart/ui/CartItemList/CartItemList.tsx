import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  CartItem,
  getCartItemsSelector,
  getCartTotal,
  removeFromCart,
  removeFromCartLS,
} from '../../../../entities/Cart';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import { getIsLoggedIn } from '../../../auth';
import useChangeQuantity from '../../api/useChangeQuantity';
import CartItemCard from '../CartItemCard/CartItemCard';
import './cartItemList.scss';

const CartItemList = () => {
  const cartItems = useSelector(getCartItemsSelector);
  const total = useSelector(getCartTotal);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useAppDispatch();
  const changeItemQuantity = useChangeQuantity();

  const onRemoveFromCart = useCallback(
    (cartItemId: string) => {
      if (isLoggedIn) {
        dispatch(removeFromCart({ cartItemId }))
          .unwrap()
          .then()
          .catch((error) => toast.error(error));
      }
      if (!isLoggedIn) {
        dispatch(removeFromCartLS(cartItemId));
      }
    },
    [dispatch, isLoggedIn]
  );

  const increaseQuantity = useCallback(
    (id: string, setQuantity: (arg: number) => void, quantity: number) => {
      setQuantity(quantity + 1);
      changeItemQuantity(id, quantity + 1);
    },
    [changeItemQuantity]
  );

  const reduceQuantity = useCallback(
    (id: string, setQuantity: (arg: number) => void, quantity: number) => {
      if (quantity === 1) {
        onRemoveFromCart(id);
        return;
      }
      setQuantity(quantity - 1);
      changeItemQuantity(id, quantity - 1);
    },
    [changeItemQuantity, onRemoveFromCart]
  );

  return (
    <div className="cartItemList">
      <div className="cartItemList__items">
        {cartItems.map((item: CartItem) => (
          <CartItemCard
            key={item._id}
            cartItem={item}
            onDelete={onRemoveFromCart}
            onIncreaseQuantity={increaseQuantity}
            onReduceQuantity={reduceQuantity}
          />
        ))}
      </div>
      <div className="cartItemList-total">
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default CartItemList;
