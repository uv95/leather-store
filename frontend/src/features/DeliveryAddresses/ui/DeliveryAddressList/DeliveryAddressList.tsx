import { useCallback, useState } from 'react';
import { Address, deleteAddress } from '../../../../entities/Address';
import { useAppDispatch } from '../../../../hooks';
import toast from '../../../../shared/lib/toast/toast';
import DeliveryAddressCard from '../DeliveryAddressCard/DeliveryAddressCard';
import './deliveryAddressList.scss';
import { useAddressIdContext } from '../../model/AddressIdContext';
import { ConfirmationModal } from '../../../../widgets/ConfirmationModal';

interface DeliveryAddressListProps {
  onOpenForm: () => void;
  addresses: Address[];
}

const DeliveryAddressList = ({
  onOpenForm,
  addresses,
}: DeliveryAddressListProps) => {
  const dispatch = useAppDispatch();
  const { setAddressId, addressId } = useAddressIdContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDelete = useCallback(() => {
    setAddressId(addressId);

    dispatch(deleteAddress(addressId))
      .unwrap()
      .then(() => toast.success('Address deleted'))
      .catch((error) => toast.error(error));
  }, [dispatch, setAddressId, addressId]);

  const onEdit = useCallback(
    (id: string) => {
      onOpenForm();
      setAddressId(id);
    },
    [setAddressId, onOpenForm]
  );

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
      <div className="deliveryAddresses">
        {addresses.map((address) => (
          <DeliveryAddressCard
            key={address._id}
            address={address}
            onEdit={() => onEdit(address._id)}
            onDelete={() => {
              onOpenModal();
              setAddressId(address._id);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default DeliveryAddressList;
