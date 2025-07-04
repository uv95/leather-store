import React, { useState, useEffect } from 'react';
import Button, { ButtonColor, ButtonSize } from '../../../UI/Button/Button';
import AddressForm from './AddressForm/AddressForm';
import AddressCard from './AddressCard/AddressCard';
import Spinner from '../../../UI/Spinner/Spinner';
import './address.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAddress } from '../../../../features/address/addressSlice';

const Address = () => {
  const { isLoading, addresses } = useAppSelector((state) => state.address);

  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addressId, setAddressId] = useState('');
  const dispatch = useAppDispatch();

  //to get address data when clicking on Edit btn
  useEffect(() => {
    addressId &&
      dispatch(getAddress(addressId))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, addressId]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="address">
          <div className="address__top">
            <h1 className="address__heading">Delivery Addresses</h1>
            <Button
              onClick={() => setOpenAddressForm(!openAddressForm)}
              color={ButtonColor.BLACK}
              size={ButtonSize.L}
            >
              Add address
            </Button>
          </div>
          <div className="address__container">
            {!addresses?.length && (
              <p className="address__container-empty">Address list is empty.</p>
            )}
            {(openAddressForm || edit) && (
              <AddressForm
                setOpenAddressForm={setOpenAddressForm}
                edit={edit}
                addressId={addressId}
                setEdit={setEdit}
              />
            )}
            {!openAddressForm && !edit && (
              <div className="address__container__list">
                {addresses?.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    setEdit={setEdit}
                    setAddressId={setAddressId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
