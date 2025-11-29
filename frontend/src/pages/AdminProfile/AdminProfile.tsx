import { useState } from 'react';
import {
  adminSidebarItems,
  AdminSidebarTab,
} from '../../shared/config/sidebar/sidebarItems';
import ProfileLayout from '../../widgets/ProfileLayout/ProfileLayout';
import Analytics from '../Analytics/Analytics';
import ItemsManagement from '../ItemsManagement';
import OrdersAdmin from '../OrdersAdmin';

const AdminProfile = () => {
  const [currentTab, setCurrentTab] = useState<AdminSidebarTab>(
    AdminSidebarTab.ORDERS
  );

  return (
    <ProfileLayout
      sidebarItems={adminSidebarItems}
      currentItem={currentTab}
      setCurrentItem={setCurrentTab}
    >
      {currentTab === AdminSidebarTab.ORDERS && <OrdersAdmin />}
      {currentTab === AdminSidebarTab.ITEMS && <ItemsManagement />}
      {currentTab === AdminSidebarTab.ANALYTICS && <Analytics />}
    </ProfileLayout>
  );
};

export default AdminProfile;
