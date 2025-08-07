import { FormEvent } from 'react';
import { Address, getAddressLoading } from '../../../../../entities/Address';
import Button, {
  ButtonTheme,
  ButtonSize,
} from '../../../../../shared/ui/Button/Button';
import Input from '../../../../../shared/ui/Input/Input';
import './addressForm.scss';
import { useSelector } from 'react-redux';

interface AddressFormProps {
  isEdit?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Address, '_id'>>>;
  addressData: Omit<Address, '_id'>;
}

const AddressForm = ({
  isEdit,
  onSubmit,
  setFormData,
  addressData,
}: AddressFormProps) => {
  const loading = useSelector(getAddressLoading);
  const { city, address, zipcode } = addressData;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
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
          required={!isEdit}
          onChange={onChange}
          disabled={loading === 'pending'}
        />
      </div>
      <div className="address-form__input-box">
        <Input
          name="address"
          label="Street, house, apartment"
          type="text"
          value={address}
          required={!isEdit}
          onChange={onChange}
          disabled={loading === 'pending'}
        />
      </div>
      <div className="address-form__input-box">
        <Input
          name="zipcode"
          label="Postal code"
          type="text"
          value={zipcode}
          required={!isEdit}
          onChange={onChange}
          disabled={loading === 'pending'}
        />
      </div>
      <Button
        type="submit"
        theme={ButtonTheme.BLACK}
        size={ButtonSize.L}
        disabled={loading === 'pending'}
      >
        {isEdit ? 'Save' : 'Add'}
      </Button>
    </form>
  );
};

export default AddressForm;
