import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserSelector } from '../../entities/User';
import { DeliveryAddresses } from '../../features/DeliveryAddresses';
import { MyInfo } from '../../features/editUserInfo';
import { useAppDispatch } from '../../hooks';
import toast from '../../shared/lib/toast/toast';
import { UserOrderList } from '../../widgets/UserOrderList';
import { UserSidebar } from '../../widgets/UserSidebar';
import './userProfile.scss';
import { Tab } from '../../widgets/UserSidebar/model/tabs';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUserSelector);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.MY_ORDERS);

  useEffect(() => {
    if (!user) {
      dispatch(getUser())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, user]);

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
