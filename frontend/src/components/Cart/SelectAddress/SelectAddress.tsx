import React, { useState } from 'react';
import './selectAddress.scss';
import AddressCard from '../../UserProfile/Content/Address/AddressCard/AddressCard';
import { useGetAllAddresses } from '../../../hooks/useGetAllAddresses';

type Props = {};

const SelectAddress = (props: Props) => {
  const [currentAddress, setCurrentAddress] = useState(0);
  const { isLoading, addresses } = useGetAllAddresses();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="selectAddress">
      <h2>Выберите адрес</h2>
      <div className="selectAddress__container">
        {addresses?.map((address, i) => (
          <AddressCard
            key={address._id}
            address={address}
            fromCart
            active={i === currentAddress}
            onClick={() => setCurrentAddress(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAddress;
