import React, { useState } from 'react';
import Button from '../../../UI/Button/Button';
import AddressForm from './AddressForm/AddressForm';
import AddressCard from './AddressCard/AddressCard';

import './address.scss';
import useGetAllAddresses from '../../../../hooks/useGetAllAddresses';

const Address = () => {
  const { isLoading, addresses } = useGetAllAddresses();

  const [openAddressForm, setOpenAddressForm] = useState(false);

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
        {openAddressForm && (
          <AddressForm setOpenAddressForm={setOpenAddressForm} />
        )}
        {!openAddressForm && (
          <div className="address__container__list">
            {addresses?.map((address) => (
              <AddressCard key={address._id} address={address} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
