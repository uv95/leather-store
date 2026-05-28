import { Address } from '../../../../entities/Address';
import styles from './CheckoutAddressCard.module.scss';

interface CheckoutAddressCardProps {
  address: Address;
  isSelected?: boolean;
  onClick?: () => void;
}

const CheckoutAddressCard = ({
  address,
  isSelected,
  onClick,
}: CheckoutAddressCardProps) => {
  return (
    <button
      className={`${styles.CheckoutAddressCard} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={onClick}
      tabIndex={isSelected ? -1 : 0}
      aria-checked={isSelected}
      role="radio"
    >
      <div className={styles.content}>
        {address.city}, {address.address}, {address.zipcode}
      </div>
    </button>
  );
};

export default CheckoutAddressCard;
