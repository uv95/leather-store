import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserAddressesSelector } from '../../../../entities/Address';
import { getIsLoggedIn } from '../../../auth';
import { RoutePath } from '../../../../shared/types/routePaths';
import CheckoutAddressCard from '../CheckoutAddressCard/CheckoutAddressCard';
import './checkoutAddressSection.scss';

type CheckoutAddressSectionProps = {
  setCurrentAddressIndex: React.Dispatch<React.SetStateAction<number>>;
  currentAddressIndex: number;
};

const CheckoutAddressSection = ({
  setCurrentAddressIndex,
  currentAddressIndex,
}: CheckoutAddressSectionProps) => {
  const addresses = useSelector(getUserAddressesSelector);
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (!addresses.length) {
    return (
      <div className="checkoutAddressSection">
        <p className="addAddress">
          Please add an address in{' '}
          <Link
            className="redLink"
            to={isLoggedIn ? RoutePath.USER_PROFILE : RoutePath.LOGIN}
          >
            personal account.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="checkoutAddressSection">
      <h2>Select address</h2>
      <div className="checkoutAddressSection__container">
        {addresses.map((address, i) => (
          <CheckoutAddressCard
            key={address._id}
            address={address}
            isSelected={i === currentAddressIndex}
            onClick={() => setCurrentAddressIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutAddressSection;
