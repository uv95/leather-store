import React from 'react';
import './addressCard.scss';
import edit from '../../../../../shared/assets/icons/edit.svg';
import trash from '../../../../../shared/assets/icons/trash.svg';
import { useAppDispatch } from '../../../../../hooks';
import toast from '../../../../../shared/lib/toast/toast';
import { Address, deleteAddress } from '../../../../../entities/Address';

interface AddressCardProps {
  address: Address;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressId?: React.Dispatch<React.SetStateAction<string>>;
  isFromCart?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  setEdit,
  setAddressId,
  isFromCart,
  isActive,
  onClick,
}) => {
  const dispatch = useAppDispatch();

  const onDelete = (id: string) => {
    dispatch(deleteAddress(id))
      .unwrap()
      .then(() => toast.success('Address deleted'))
      .catch((error) => toast.error(error));
  };

  return (
    <div
      className={`address-card ${isActive ? 'address-card-active' : ''} ${
        isFromCart ? 'address-card__fromCart' : ''
      }`}
      onClick={onClick}
    >
      <div className="address-card__right">
        {address.city}, {address.address}, {address.zipcode}
      </div>
      {!isFromCart && (
        <div className="address-card__left">
          <img
            src={edit}
            alt="edit"
            onClick={() => {
              setEdit!(true);
              setAddressId!(address._id!);
            }}
          />
          <img
            src={trash}
            alt="delete"
            onClick={() => onDelete(address._id!)}
          />
        </div>
      )}
    </div>
  );
};

export default AddressCard;
