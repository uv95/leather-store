import React, { useState, useEffect } from 'react';
import './addressForm.scss';
import Input from '../../../../../shared/ui/Input/Input';
import Button, { ButtonColor, ButtonSize } from '../../../../../shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  addAddress,
  updateAddress,
} from '../../../../../features/address/addressSlice';
import toast from '../../../../../shared/lib/toast/toast';

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

  const { address: currAddress } = useAppSelector((state) => state.address);

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
        .then((_) => {
          setOpenAddressForm(false);
          toast.success('Address updated');
          setEdit(false);
        })
        .catch((error) => toast.error(error));
    }

    !edit &&
      dispatch(addAddress(formData))
        .unwrap()
        .then(() => {
          setOpenAddressForm(false);
          toast.success('Address successfully added');
        })
        .catch((error) => toast.error(error));
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
      <Button type="submit" color={ButtonColor.BLACK} size={ButtonSize.L}>
        {edit ? 'Save' : 'Add'}
      </Button>
    </form>
  );
};

export default AddressForm;
