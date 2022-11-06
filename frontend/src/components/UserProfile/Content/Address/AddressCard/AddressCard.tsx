import React from 'react';
import './addressCard.scss';
import edit from '../../../../../assets/icons/edit.svg';
import trash from '../../../../../assets/icons/trash.svg';
import { useAppDispatch } from '../../../../../hooks';
import { deleteAddress } from '../../../../../features/address/addressSlice';
import { IAddress } from '../../../../../types/data';

interface AddressCardProps {
  address: IAddress;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressId: React.Dispatch<React.SetStateAction<string>>;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  setEdit,
  setAddressId,
}) => {
  const dispatch = useAppDispatch();

  const onDelete = (id: string) => {
    dispatch(deleteAddress(id))
      .unwrap()
      .then((data) => console.log(data, 'data'))
      .catch((error) => console.log(error, 'ERROR'));
  };

  return (
    <div className="address-card">
      <div className="address-card__right">
        <div className="address-card__right__field">
          <p className="address-card__right__field-name">Город:</p>
          <p className="address-card__right__field-value">{address.city}</p>
        </div>
        <div className="address-card__right__field">
          <p className="address-card__right__field-name">Индекс:</p>
          <p className="address-card__right__field-value">{address.zipcode}</p>
        </div>
        <div className="address-card__right__field">
          <p className="address-card__right__field-name">Полный адрес:</p>
          <p className="address-card__right__field-value">{address.address}</p>
        </div>
      </div>
      <div className="address-card__left">
        <img
          src={edit}
          alt="редактировать"
          onClick={() => {
            setEdit(true);
            setAddressId(address._id!);
          }}
        />
        <img src={trash} alt="удалить" onClick={() => onDelete(address._id!)} />
      </div>
    </div>
  );
};

export default AddressCard;
