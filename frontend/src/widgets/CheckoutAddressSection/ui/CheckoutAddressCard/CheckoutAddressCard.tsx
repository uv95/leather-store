import { Address } from '../../../../entities/Address';
import './checkoutAddressCard.scss';

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
    <div
      className={`checkoutAddressCard ${
        isSelected ? 'checkoutAddressCard--selected' : ''
      }`}
      onClick={onClick}
    >
      <div className="checkoutAddressCard-content">
        {address.city}, {address.address}, {address.zipcode}
      </div>
    </div>
  );
};

export default CheckoutAddressCard;
