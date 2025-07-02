import React, { useState, useEffect } from 'react';
import './addressForm.scss';
import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  addAddress,
  updateAddress,
} from '../../../../../features/address/addressSlice';

interface AddressFormProps {
  edit: boolean;
  setOpenAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
  addressId: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressForm: React.FC<AddressFormProps> = ({
  edit,
  setOpenAddressForm,
  addressId,
  setEdit,
}) => {
  const dispatch = useAppDispatch();

  const { isLoading, address: currAddress } = useAppSelector(
    (state) => state.address
  );

  const [formData, setFormData] = useState({
    city: '',
    address: '',
    zipcode: '',
  });
  const { city, address, zipcode } = formData;

  useEffect(() => {
    edit &&
      currAddress &&
      setFormData({
        city: currAddress.city,
        address: currAddress.address,
        zipcode: currAddress.zipcode,
      });
  }, [edit, currAddress]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (edit && addressId) {
      dispatch(updateAddress({ addressId, updatedAddress: formData }))
        .unwrap()
        .then((_) => setOpenAddressForm(false))
        .catch((error) => console.log(error, 'error'));

      setEdit(false);
    }
    !edit &&
      dispatch(addAddress(formData))
        .unwrap()
        .then((_) => setOpenAddressForm(false))
        .catch((error) => console.log(error, 'error'));
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <form className="address-form" onSubmit={onSubmit}>
      <div className="address-form__input-box">
        <Input
          name="city"
          label="City"
          type="text"
          value={city}
          required={!edit}
          onChange={onChange}
        />
      </div>
      <div className="address-form__input-box">
        <Input
          name="address"
          label="Street, house, apartment"
          type="text"
          value={address}
          required={!edit}
          onChange={onChange}
        />
      </div>
      <div className="address-form__input-box">
        <Input
          name="zipcode"
          label="Postal code"
          type="text"
          value={zipcode}
          required={!edit}
          onChange={onChange}
        />
      </div>
      <Button type="submit" text={edit ? 'Save' : 'Add'} color="black" big />
    </form>
  );
};

export default AddressForm;
