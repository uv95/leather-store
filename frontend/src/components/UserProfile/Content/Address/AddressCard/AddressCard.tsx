import React from 'react';
import './addressCard.scss';
import edit from '../../../../../assets/icons/edit.svg';
import trash from '../../../../../assets/icons/trash.svg';
import { useAppDispatch } from '../../../../../hooks';
import { deleteAddress } from '../../../../../features/address/addressSlice';
import { IAddress } from '../../../../../types/data';
import toast from '../../../../../lib/toast';

interface AddressCardProps {
  address: IAddress;
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
