import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Address,
  getAddressSelector,
  updateAddress,
} from '../../../../../entities/Address';
import { useAppDispatch } from '../../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../../shared/lib/toast/toast';
import { useAddressIdContext } from '../../../model/AddressIdContext';
import AddressForm from '../AddressForm/AddressForm';
import { StateSchema } from '../../../../../app/providers/StoreProvider';

const EditAddressForm = () => {
  const dispatch = useAppDispatch();
  const { addressId } = useAddressIdContext();
  const address = useSelector((state: StateSchema) =>
    getAddressSelector(state)(addressId)
  );

  const [formData, setFormData] = useState<Omit<Address, '_id'>>({
    city: '',
    address: '',
    zipcode: '',
  });

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

    dispatch(updateAddress({ addressId, dto: formData }))
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
      isEdit
    />
  );
};

export default EditAddressForm;
