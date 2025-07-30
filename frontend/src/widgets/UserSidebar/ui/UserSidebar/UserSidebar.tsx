import { memo, useCallback, useState } from 'react';
import useLogout from '../../../../hooks/useLogout';
import { ConfirmationModal } from '../../../ConfirmationModal';
import { Tab, tabs } from '../../model/tabs';
import SidebarButton from '../SidebarButton/SidebarButton';

interface UserSidebarProps {
  currentTab: Tab;
  setCurrentTab: (arg: Tab) => void;
}

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
            onClick={() =>
              tab.text === Tab.LOG_OUT ? onOpenModal() : setCurrentTab(tab.text)
            }
          />
        ))}
      </div>
    </>
  );
});

export default UserSidebar;
