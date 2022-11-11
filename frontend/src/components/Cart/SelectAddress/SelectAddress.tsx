import React, { useState } from 'react';
import './selectAddress.scss';
import AddressCard from '../../UserProfile/Content/Address/AddressCard/AddressCard';
import { useGetAllAddresses } from '../../../hooks/useGetAllAddresses';
import { IAddress } from '../../../types/data';

type SelectAddressProps = {
  setCurrentAddressIndex: React.Dispatch<React.SetStateAction<number>>;
  currentAddressIndex: number;
  addresses: IAddress[];
};

const SelectAddress = ({
  setCurrentAddressIndex,
  currentAddressIndex,
  addresses,
}: SelectAddressProps) => {
  const { isLoading } = useGetAllAddresses();

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
            active={i === currentAddressIndex}
            onClick={() => setCurrentAddressIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAddress;
