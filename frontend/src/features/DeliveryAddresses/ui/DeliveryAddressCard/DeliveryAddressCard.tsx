import React from 'react';
import { Address } from '../../../../entities/Address';
import { ReactComponent as Edit } from '../../../../shared/assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../../../shared/assets/icons/trash.svg';
import './deliveryAddressCard.scss';

interface DeliveryAddressCardProps {
  address: Address;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = ({
  address,
  onClick,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="deliveryAddressCard" onClick={onClick}>
      <div className="deliveryAddressCard-content">
        {address.city}, {address.address}, {address.zipcode}
      </div>

      <div className="deliveryAddressCard-buttons">
        <Edit className="deliveryAddressCard-icon" onClick={onEdit} />
        <Delete className="deliveryAddressCard-icon" onClick={onDelete} />
      </div>
    </div>
  );
};

export default DeliveryAddressCard;
