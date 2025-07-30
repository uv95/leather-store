import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../entities/User';
import { DeliveryAddresses } from '../../features/DeliveryAddresses';
import { MyInfo } from '../../features/editUserInfo';
import { UserOrderList } from '../../widgets/UserOrderList';
import { UserSidebar } from '../../widgets/UserSidebar';
import { Tab } from '../../widgets/UserSidebar/model/tabs';
import './userProfile.scss';

const UserProfile = () => {
  const user = useSelector(getUserSelector);
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.MY_ORDERS);

  return (
    <div className="profile">
      <h1 className="profile__heading">{user?.name}</h1>
      <div className="profile__container">
        <div className="profile__container__nav">
          <UserSidebar setCurrentTab={setCurrentTab} currentTab={currentTab} />
        </div>
        <div className="profile__container__content">
          {currentTab === Tab.MY_ORDERS && <UserOrderList />}
          {currentTab === Tab.DELIVERY_ADDRESSES && <DeliveryAddresses />}
          {currentTab === Tab.MY_INFO && <MyInfo />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
