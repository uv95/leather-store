import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../entities/User';
import { ConfirmationModal } from '../../../../shared/ui/ConfirmationModal';
import { Tab, tabs } from '../../model/tabs';
import SidebarButton from '../SidebarButton/SidebarButton';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';

interface UserSidebarProps {
  currentTab: Tab;
  setCurrentTab: (arg: Tab) => void;
}

const UserSidebar = memo(({ setCurrentTab, currentTab }: UserSidebarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          confirmAction={onLogout}
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
