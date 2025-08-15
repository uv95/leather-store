import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getUserAddresses,
  getUserAddressesSelector,
} from '../../../../entities/Address';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import { AddressIdProvider } from '../../model/AddressIdContext';
import AddAddressForm from '../DeliveryAddressForm/AddAddressForm/AddAddressForm';
import EditAddressForm from '../DeliveryAddressForm/EditAddressForm/EditAddressForm';
import DeliveryAddressList from '../DeliveryAddressList/DeliveryAddressList';
import './deliveryAddresses.scss';

const DeliveryAddresses = () => {
  const dispatch = useAppDispatch();
  const addresses = useSelector(getUserAddressesSelector);

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
      dispatch(getUserAddresses())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, addresses.length]);

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
