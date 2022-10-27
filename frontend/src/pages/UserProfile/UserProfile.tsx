import React, { useState } from 'react';
import './userProfile.scss';
import Navigation from '../../components/UserProfile/Navigation/Navigation';
import Address from '../../components/UserProfile/Content/Address/Address';
import MyInfo from '../../components/UserProfile/Content/MyInfo/MyInfo';
import MyOrders from '../../components/UserProfile/Content/MyOrders/MyOrders';

type Props = {};

const UserProfile = (props: Props) => {
  const [currentTab, setCurrentTab] = useState('Мои заказы');
  return (
    <div className="profile">
      <h1 className="profile__heading">Личный кабинет</h1>
      <div className="profile__container">
        <div className="profile__container__nav">
          <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
        </div>
        <div className="profile__container__content">
          {currentTab === 'Мои заказы' && <MyOrders />}
          {currentTab === 'Адреса доставки' && <Address />}
          {currentTab === 'Мои данные' && <MyInfo />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
