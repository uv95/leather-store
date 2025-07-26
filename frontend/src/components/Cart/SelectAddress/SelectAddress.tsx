import React from 'react';
import './selectAddress.scss';
import AddressCard from '../../UserProfile/Content/Address/AddressCard/AddressCard';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';

type SelectAddressProps = {
  setCurrentAddressIndex: React.Dispatch<React.SetStateAction<number>>;
  currentAddressIndex: number;
};

const SelectAddress = ({
  setCurrentAddressIndex,
  currentAddressIndex,
}: SelectAddressProps) => {
  const { addresses, isLoading } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="selectAddress">
      {addresses.length ? (
        <>
          <h2>Select address</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="selectAddress__container">
              {addresses?.map((address, i) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  isFromCart
                  isActive={i === currentAddressIndex}
                  onClick={() => setCurrentAddressIndex(i)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="addAddress">
          Please add an address in{' '}
          <Link
            className="redLink"
            to={user ? RoutePath.USER_PROFILE : RoutePath.LOGIN}
          >
            personal account.
          </Link>
        </p>
      )}
    </div>
  );
};

export default SelectAddress;
