import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Address,
  getAddress,
  getAddressIsLoading,
  getAddressSelector,
  updateAddress,
} from '../../../../../entities/Address';
import { useAppDispatch } from '../../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../../shared/lib/toast/toast';
import AddressForm from '../AddressForm/AddressForm';
import { useAddressIdContext } from '../../../model/AddressIdContext';

const EditAddressForm = () => {
  const dispatch = useAppDispatch();
  const { addressId } = useAddressIdContext();

  const isLoading = useSelector(getAddressIsLoading);
  const address = useSelector(getAddressSelector);

  const [formData, setFormData] = useState<Omit<Address, '_id'>>({
    city: '',
    address: '',
    zipcode: '',
  });

  useEffect(() => {
    dispatch(getAddress(addressId))
      .unwrap()
      .then()
      .catch((error) => toast.error(error));
  }, [dispatch, addressId]);

  useEffect(() => {
    address &&
      setFormData({
        city: address.city,
        address: address.address,
        zipcode: address.zipcode,
      });
  }, [address]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateAddress({ addressId, newData: formData }))
      .unwrap()
      .then((_) => {
        toast.success('Address updated');
      })
      .catch((error) => toast.error(error));
  };

  return (
    <AddressForm
      onSubmit={onSubmit}
      setFormData={setFormData}
      addressData={formData}
      isInputDisabled={isLoading}
      isEdit
    />
  );
};

export default EditAddressForm;
