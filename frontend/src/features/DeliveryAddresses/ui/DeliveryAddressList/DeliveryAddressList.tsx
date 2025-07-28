import { useCallback } from 'react';
import { Address, deleteAddress } from '../../../../entities/Address';
import { useAppDispatch } from '../../../../hooks';
import toast from '../../../../shared/lib/toast/toast';
import DeliveryAddressCard from '../DeliveryAddressCard/DeliveryAddressCard';
import './deliveryAddressList.scss';

interface DeliveryAddressListProps {
  onOpenForm: () => void;
  setAddressId: (arg: string) => void;
  addresses: Address[];
}

const DeliveryAddressList = ({
  onOpenForm,
  setAddressId,
  addresses,
}: DeliveryAddressListProps) => {
  const dispatch = useAppDispatch();

  const onDelete = useCallback(
    (id: string) => {
      dispatch(deleteAddress(id))
        .unwrap()
        .then(() => toast.success('Address deleted'))
        .catch((error) => toast.error(error));
    },
    [dispatch]
  );

  const onEdit = useCallback(
    (id: string) => {
      onOpenForm();
      setAddressId(id);
    },
    [setAddressId, onOpenForm]
  );

  return (
    <div className="deliveryAddresses">
      {addresses.map((address) => (
        <DeliveryAddressCard
          key={address._id}
          address={address}
          onEdit={() => onEdit(address._id)}
          onDelete={() => onDelete(address._id)}
        />
      ))}
    </div>
  );
};

export default DeliveryAddressList;
