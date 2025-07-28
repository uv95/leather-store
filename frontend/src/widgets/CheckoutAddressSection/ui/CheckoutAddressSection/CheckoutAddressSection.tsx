import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import CheckoutAddressCard from '../CheckoutAddressCard/CheckoutAddressCard';
import './checkoutAddressSection.scss';
import { useSelector } from 'react-redux';
import { getAllAddressesSelector } from '../../../../entities/Address';

type CheckoutAddressSectionProps = {
  setCurrentAddressIndex: React.Dispatch<React.SetStateAction<number>>;
  currentAddressIndex: number;
};

const CheckoutAddressSection = ({
  setCurrentAddressIndex,
  currentAddressIndex,
}: CheckoutAddressSectionProps) => {
  const addresses = useSelector(getAllAddressesSelector);
  const { user } = useAppSelector((state) => state.auth);

  if (!addresses.length) {
    return (
      <div className="checkoutAddressSection">
        <p className="addAddress">
          Please add an address in{' '}
          <Link
            className="redLink"
            to={user ? RoutePath.USER_PROFILE : RoutePath.LOGIN}
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
