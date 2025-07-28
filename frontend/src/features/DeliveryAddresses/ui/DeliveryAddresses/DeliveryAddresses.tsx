import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getAddressIsLoading,
  getAllAddressesSelector,
} from '../../../../entities/Address';
import Button, {
  ButtonColor,
  ButtonSize,
} from '../../../../shared/ui/Button/Button';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import AddAddressForm from '../DeliveryAddressForm/AddAddressForm/AddAddressForm';
import EditAddressForm from '../DeliveryAddressForm/EditAddressForm/EditAddressForm';
import DeliveryAddressList from '../DeliveryAddressList/DeliveryAddressList';
import './deliveryAddresses.scss';

const DeliveryAddresses = () => {
  const isLoading = useSelector(getAddressIsLoading);
  const addresses = useSelector(getAllAddressesSelector);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addressId, setAddressId] = useState('');
  const isOpenEditForm = isFormOpen && isEdit;
  const isOpenAddForm = isFormOpen && !isEdit;

  const onCloseForm = useCallback(() => {
    setIsEdit(false);
    setIsFormOpen(false);
  }, []);

  const onOpenForm = useCallback(() => {
    setIsEdit(true);
    setIsFormOpen(true);
  }, []);

  const onClickButton = useCallback(() => {
    if (isFormOpen) {
      onCloseForm();
    } else {
      setIsFormOpen(true);
    }
  }, [isFormOpen, onCloseForm]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="deliveryAddresses-header">
        <h1 className="deliveryAddresses-title">Delivery Addresses</h1>
        <Button
          onClick={onClickButton}
          color={ButtonColor.BLACK}
          size={ButtonSize.L}
        >
          {isFormOpen ? 'Back' : 'Add address'}
        </Button>
      </div>
      <div className="deliveryAddresses-container">
        {!addresses.length && <p>Address list is empty.</p>}

        {isOpenEditForm && <EditAddressForm addressId={addressId} />}

        {isOpenAddForm && (
          <AddAddressForm onCloseForm={() => setIsFormOpen(false)} />
        )}

        {!isFormOpen && (
          <DeliveryAddressList
            setAddressId={setAddressId}
            addresses={addresses}
            onOpenForm={onOpenForm}
          />
        )}
      </div>
    </>
  );
};

export default DeliveryAddresses;
