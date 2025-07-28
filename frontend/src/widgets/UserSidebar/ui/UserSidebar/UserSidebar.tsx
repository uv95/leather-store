import React, { memo, useCallback, useState } from 'react';
import useLogout from '../../../../hooks/useLogout';
import location from '../../../../shared/assets/icons/location.svg';
import logoutsvg from '../../../../shared/assets/icons/logout.svg';
import orders from '../../../../shared/assets/icons/orders.svg';
import portrait from '../../../../shared/assets/icons/portrait.svg';
import { ConfirmationModal } from '../../../ConfirmationModal';
import SidebarButton from '../SidebarButton/SidebarButton';

interface UserSidebarProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const tabs = [
  { text: 'My Orders', icon: orders },
  { text: 'Delivery Addresses', icon: location },
  { text: 'My Info', icon: portrait },
];

const UserSidebar = memo(({ setCurrentTab, currentTab }: UserSidebarProps) => {
  const logoutUser = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          confirmAction={logoutUser}
          text="Are you sure you want to log out?"
        />
      )}

      <div className="nav">
        {tabs.map((tab) => (
          <SidebarButton
            key={tab.text}
            text={tab.text}
            isActive={currentTab === tab.text}
            icon={tab.icon}
            onClick={() => setCurrentTab(tab.text)}
          />
        ))}
        <SidebarButton
          text={'Log out'}
          isActive={currentTab === 'Log out'}
          icon={logoutsvg}
          onClick={onOpenModal}
        />
      </div>
    </>
  );
});

export default UserSidebar;
