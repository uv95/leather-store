import React, { useCallback, useState } from 'react';
import useLogout from '../../../hooks/useLogout';
import location from '../../../shared/assets/icons/location.svg';
import logoutsvg from '../../../shared/assets/icons/logout.svg';
import orders from '../../../shared/assets/icons/orders.svg';
import portrait from '../../../shared/assets/icons/portrait.svg';
import { ConfirmationModal } from '../../../widgets/ConfirmationModal';
import Tab from './Tab/Tab';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = React.memo(
  ({ setCurrentTab, currentTab }) => {
    const logoutUser = useLogout();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tabs = [
      { text: 'My Orders', icon: orders },
      { text: 'Delivery Addresses', icon: location },
      { text: 'My Info', icon: portrait },
    ];

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
          {tabs.map((tab, i) => (
            <Tab
              key={tab.text}
              text={tab.text}
              onClick={() => setCurrentTab(tab.text)}
              active={currentTab === tab.text}
              icon={tab.icon}
            />
          ))}
          <Tab
            text={'Log out'}
            onClick={onOpenModal}
            active={currentTab === 'Log out'}
            icon={logoutsvg}
          />
        </div>
      </>
    );
  }
);

export default Navigation;
