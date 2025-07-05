import { memo, ReactNode } from 'react';
import Back from '../../UI/Back/Back';
import Spinner from '../../UI/Spinner/Spinner';

interface CartLayoutProps {
  isCartEmpty: boolean;
  isLoading: boolean;
  children: ReactNode;
}

const CartLayout = ({ isCartEmpty, isLoading, children }: CartLayoutProps) => {
  return (
    <div className="cart">
      <Back />
      <h1 className="cart__heading">Cart</h1>
      <div className="cart__container">
        {isLoading && <Spinner />}
        {isCartEmpty && !isLoading && (
          <p className="cart__container-empty">Cart is empty</p>
        )}
        {!isLoading && !isCartEmpty && children}
      </div>
    </div>
  );
};

export default memo(CartLayout);
