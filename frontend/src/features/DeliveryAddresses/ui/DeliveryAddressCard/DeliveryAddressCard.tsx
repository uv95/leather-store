import React, { useCallback, useState } from 'react';
import { Address } from '../../../../entities/Address';
import { ReactComponent as Edit } from '../../../../shared/assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../../../shared/assets/icons/trash.svg';
import './deliveryAddressCard.scss';
import { ConfirmationModal } from '../../../../widgets/ConfirmationModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {isModalOpen && onDelete && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          confirmAction={onDelete}
          text="Are you sure you want to delete the address?"
        />
      )}
      <div className="deliveryAddressCard" onClick={onClick}>
        <div className="deliveryAddressCard-content">
          {address.city}, {address.address}, {address.zipcode}
        </div>

        <div className="deliveryAddressCard-buttons">
          <Edit className="deliveryAddressCard-icon" onClick={onEdit} />
          <Delete className="deliveryAddressCard-icon" onClick={onOpenModal} />
        </div>
      </div>
    </>
  );
};

export default DeliveryAddressCard;
