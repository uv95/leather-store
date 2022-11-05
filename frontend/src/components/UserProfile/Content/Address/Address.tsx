import React, { useState, useEffect } from 'react';
import Button from '../../../UI/Button/Button';
import AddressForm from './AddressForm/AddressForm';
import AddressCard from './AddressCard/AddressCard';
import './address.scss';
import { useGetAllAddresses } from '../../../../hooks/useGetAllAddresses';
import { useAppDispatch } from '../../../../hooks';
import { getAddress } from '../../../../features/address/addressSlice';

const Address = () => {
  const { isLoading, addresses } = useGetAllAddresses();

  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addressId, setAddressId] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    addressId &&
      dispatch(getAddress(addressId))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, addressId]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="address">
      <div className="address__top">
        <h1 className="address__heading">Адреса доставки</h1>
        <Button
          onClick={() => setOpenAddressForm(!openAddressForm)}
          text="Добавить адрес"
          color="black"
          big
        />
      </div>
      <div className="address__container">
        {!addresses?.length && (
          <p className="address__container-empty">Список адресов пуст.</p>
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
  );
};

export default Address;
