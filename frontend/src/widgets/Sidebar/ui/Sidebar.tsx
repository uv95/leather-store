import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../entities/User';
import {
  SidebarItem,
  Tab,
  UserSidebarTab,
} from '../../../shared/config/sidebar/sidebarItems';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import Button, { ButtonTheme } from '../../../shared/ui/Button/Button';
import { ConfirmationModal } from '../../../shared/ui/ConfirmationModal';
import styles from './Sidebar.module.scss';

interface SidebarProps<T> {
  currentItem: T;
  setCurrentItem: (arg: T) => void;
  items: SidebarItem<T>[];
}

function Sidebar<T extends Tab>({
  setCurrentItem,
  currentItem,
  items,
}: SidebarProps<T>) {
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
          title="Are you sure you want to log out?"
          buttonTexts={{ yes: 'Log out', no: 'Cancel' }}
        />
      )}

      <nav className={styles.nav} aria-label="Sidebar">
        {items.map((item) => (
          <Button
            theme={ButtonTheme.CLEAR}
            key={item.text}
            onClick={() =>
              item.text === UserSidebarTab.LOG_OUT
                ? onOpenModal()
                : setCurrentItem(item.text)
            }
            className={`${styles.button} ${
              currentItem === item.text ? styles.buttonActive : ''
            }`}
            aria-current={currentItem === item.text ? 'page' : undefined}
            aria-describedby={
              item.text === UserSidebarTab.LOG_OUT
                ? 'logout-description'
                : undefined
            }
          >
            <div className={styles.icon}>
              <img src={item.icon} alt={''} aria-hidden={true} />
            </div>
            <div className={styles.text}>{item.text}</div>
          </Button>
        ))}
        <span id="logout-description" className={styles.visuallyHidden}>
          This action will log you out of your account
        </span>
      </nav>
    </>
  );
}

export default memo(Sidebar) as typeof Sidebar;
