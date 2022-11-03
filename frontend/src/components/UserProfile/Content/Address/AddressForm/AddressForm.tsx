import React, { useState } from 'react';
import './addressForm.scss';
import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';
import { useAppDispatch } from '../../../../../hooks';
import { addAddress } from '../../../../../features/address/addressSlice';

interface AddressFormProps {
  edit?: boolean;
  setOpenAddressForm: (arg: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  edit,
  setOpenAddressForm,
}) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    city: '',
    address: '',
    zipcode: '',
  });
  const { city, address, zipcode } = formData;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addAddress(formData))
      .unwrap()
      .then((data) => {
        console.log(data);
        setOpenAddressForm(false);
      })
      .catch((error) => console.log(error, 'error'));
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <form className="address-form" onSubmit={onSubmit}>
      <div className="address-form__input-box">
        <Input
          name="city"
          label="Город"
          type="text"
          value={city}
          required
          onChange={onChange}
        />
      </div>
      <div className="address-form__input-box">
        <Input
          name="address"
          label="Полный адрес"
          type="text"
          value={address}
          required
          onChange={onChange}
        />
      </div>
      <div className="address-form__input-box">
        <Input
          name="zipcode"
          label="Индекс"
          type="text"
          value={zipcode}
          required
          onChange={onChange}
        />
      </div>
      <Button type="submit" text="Добавить" color="black" big />
    </form>
  );
};

export default AddressForm;
