import { memo } from 'react';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../shared/ui/Button/Button';

interface CartButtonProps {
  onClick: () => void;
  isSelectAddressOpen: boolean;
  addressNum: number;
}

const CartButton = ({
  onClick,
  isSelectAddressOpen,
  addressNum,
}: CartButtonProps) => {
  return (
    <div className="cart__container__btn">
      <Button
        onClick={onClick}
        theme={ButtonTheme.BLACK}
        size={ButtonSize.L}
        isAnimated={isSelectAddressOpen}
        disabled={!isSelectAddressOpen ? false : !addressNum}
      >
        {isSelectAddressOpen ? 'Order' : 'Checkout'}
      </Button>
    </div>
  );
};

export default memo(CartButton);
