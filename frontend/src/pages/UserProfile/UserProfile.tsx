import { useEffect, useState } from 'react';
import { DeliveryAddresses } from '../../features/DeliveryAddresses';
import { MyInfo } from '../../features/editUserInfo';
import {
  userSidebarItems,
  UserSidebarTab,
} from '../../shared/config/sidebar/sidebarItems';
import ProfileLayout from '../../widgets/ProfileLayout/ProfileLayout';
import { UserOrderList } from '../../widgets/UserOrderList';

const UserProfile = () => {
  const [currentTab, setCurrentTab] = useState<UserSidebarTab>(
    UserSidebarTab.MY_ORDERS,
  );

  useEffect(() => {
    document.title = `My Profile | ${currentTab}`;
  }, [currentTab]);

  return (
    <ProfileLayout
      sidebarItems={userSidebarItems}
      currentItem={currentTab}
      setCurrentItem={setCurrentTab}
    >
      {currentTab === UserSidebarTab.MY_ORDERS && <UserOrderList />}
      {currentTab === UserSidebarTab.DELIVERY_ADDRESSES && (
        <DeliveryAddresses />
      )}
      {currentTab === UserSidebarTab.MY_INFO && <MyInfo />}
    </ProfileLayout>
  );
};

export default UserProfile;
