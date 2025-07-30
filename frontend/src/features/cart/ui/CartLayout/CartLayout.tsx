import { memo, ReactNode } from 'react';
import Back from '../../../../shared/ui/Back/Back';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import { getCartIsLoading } from '../../../../entities/Cart';
import { useSelector } from 'react-redux';

interface CartLayoutProps {
  isCartEmpty: boolean;
  children: ReactNode;
}

const CartLayout = ({ isCartEmpty, children }: CartLayoutProps) => {
  const isLoading = useSelector(getCartIsLoading);

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
