import React, { FormEvent, useState } from 'react';
import { addAddress, Address } from '../../../../../entities/Address';
import { useAppDispatch } from '../../../../../hooks';
import toast from '../../../../../shared/lib/toast/toast';
import AddressForm from '../AddressForm/AddressForm';

interface AddAddressFormProps {
  onCloseForm: () => void;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ onCloseForm }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Omit<Address, '_id'>>({
    city: '',
    address: '',
    zipcode: '',
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addAddress(formData))
      .unwrap()
      .then(() => {
        onCloseForm();
        toast.success('Address successfully added');
      })
      .catch((error) => toast.error(error));
  };

  return (
    <AddressForm
      onSubmit={onSubmit}
      setFormData={setFormData}
      addressData={formData}
    />
  );
};

export default AddAddressForm;
