import React from 'react';
import './selectAddress.scss';
import AddressCard from '../../UserProfile/Content/Address/AddressCard/AddressCard';
import Spinner from '../../UI/Spinner/Spinner';
import { useGetAllAddresses } from '../../../hooks/useGetAllAddresses';
import { IAddress } from '../../../types/data';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, USER_PROFILE_ROUTE } from '../../../utils/consts';
import { useAppSelector } from '../../../hooks';

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
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="selectAddress">
      {addresses.length ? (
        <>
          <h2>Выберите адрес</h2>
          {isLoading ? (
            <Spinner />
          ) : (
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
          )}
        </>
      ) : (
        <p className="addAddress">
          Пожалуйста, добавьте адрес в{' '}
          <Link
            className="redLink"
            to={user ? USER_PROFILE_ROUTE : LOGIN_ROUTE}
          >
            личном кабинете.
          </Link>
        </p>
      )}
    </div>
  );
};

export default SelectAddress;
