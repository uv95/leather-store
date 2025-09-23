import { memo } from 'react';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import styles from './CartButton.module.scss';

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
    <div className={styles.CartButton}>
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
