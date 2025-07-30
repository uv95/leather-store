import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getAddressIsLoading,
  getAllAddresses,
  getAllAddressesSelector,
} from '../../../../entities/Address';
import Button, {
  ButtonTheme,
  ButtonSize,
} from '../../../../shared/ui/Button/Button';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import { AddressIdProvider } from '../../model/AddressIdContext';
import AddAddressForm from '../DeliveryAddressForm/AddAddressForm/AddAddressForm';
import EditAddressForm from '../DeliveryAddressForm/EditAddressForm/EditAddressForm';
import DeliveryAddressList from '../DeliveryAddressList/DeliveryAddressList';
import './deliveryAddresses.scss';
import toast from '../../../../shared/lib/toast/toast';
import { useAppDispatch } from '../../../../hooks';

const DeliveryAddresses = () => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector(getAddressIsLoading);
  const addresses = useSelector(getAllAddressesSelector);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  useEffect(() => {
    if (!addresses.length) {
      dispatch(getAllAddresses())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, addresses.length]);

  if (isLoading) return <Spinner />;

  return (
    <AddressIdProvider>
      <div className="deliveryAddresses-header">
        <h1 className="deliveryAddresses-title">Delivery Addresses</h1>
        <Button
          onClick={onClickButton}
          theme={ButtonTheme.BLACK}
          size={ButtonSize.L}
        >
          {isFormOpen ? 'Back' : 'Add address'}
        </Button>
      </div>
      <div className="deliveryAddresses-container">
        {!addresses.length && <p>Address list is empty.</p>}

        {isOpenEditForm && <EditAddressForm />}

        {isOpenAddForm && (
          <AddAddressForm onCloseForm={() => setIsFormOpen(false)} />
        )}

        {!isFormOpen && (
          <DeliveryAddressList addresses={addresses} onOpenForm={onOpenForm} />
        )}
      </div>
    </AddressIdProvider>
  );
};

export default DeliveryAddresses;
