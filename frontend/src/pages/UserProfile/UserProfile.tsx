import { useState } from 'react';
import MyInfo from '../../components/UserProfile/Content/MyInfo/MyInfo';
import MyOrders from '../../components/UserProfile/Content/MyOrders/MyOrders';
import Navigation from '../../components/UserProfile/Navigation/Navigation';
import { DeliveryAddresses } from '../../features/DeliveryAddresses';
import useGetAllAddresses from '../../hooks/useGetAllAddresses';
import useGetMe from '../../hooks/useGetMe';
import './userProfile.scss';

const UserProfile = () => {
  useGetMe();
  useGetAllAddresses();

  const [currentTab, setCurrentTab] = useState('My Orders');

  return (
    <div className="profile">
      <h1 className="profile__heading">Account</h1>
      <div className="profile__container">
        <div className="profile__container__nav">
          <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
        </div>
        <div className="profile__container__content">
          {currentTab === 'My Orders' && <MyOrders />}
          {currentTab === 'Delivery Addresses' && <DeliveryAddresses />}
          {currentTab === 'My Info' && <MyInfo />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
