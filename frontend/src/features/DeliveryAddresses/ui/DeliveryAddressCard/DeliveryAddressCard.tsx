import React from 'react';
import { Address } from '../../../../entities/Address';
import { ReactComponent as Edit } from '../../../../shared/assets/icons/edit.svg';
import { ReactComponent as Delete } from '../../../../shared/assets/icons/trash.svg';
import styles from './DeliveryAddressCard.module.scss';
import Button, { ButtonTheme } from '../../../../shared/ui/Button/Button';

interface DeliveryAddressCardProps {
  address: Address;
  onDelete?: () => void;
  onEdit?: () => void;
}

const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = ({
  address,
  onDelete,
  onEdit,
}) => {
  const fullAddress = `${address.city}, ${address.address}, ${address.zipcode}`;

  return (
    <div className={styles.DeliveryAddressCard}>
      <div className={styles.content}>{fullAddress}</div>

      <div className={styles.buttons}>
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={onEdit}
          aria-label={`Edit address: ${fullAddress}`}
        >
          <Edit className={styles.icon} aria-hidden="true" />
        </Button>
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={onDelete}
          aria-label={`Delete address: ${fullAddress}`}
        >
          <Delete className={styles.icon} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default DeliveryAddressCard;
