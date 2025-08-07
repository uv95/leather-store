import { memo, useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../entities/User';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { ConfirmationModal } from '../../../shared/ui/ConfirmationModal';
import { Tab, tabs } from '../model/tabs';
import './adminNavbar.scss';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';

const AdminNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [currentTab, setCurrentTab] = useState<{ text: Tab; route: RoutePath }>(
    {
      text: Tab.ORDERS,
      route: RoutePath.ADMIN_ORDERS,
    }
  );
  const [openMenu, setOpenMenu] = useState(false);
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
      <div className="header__container__admin">
        {tabs.map((tab) => (
          <Link
            key={tab.text}
            to={tab.route}
            className={`${
              tab.route === pathname
                ? 'header__container__admin-link-active'
                : 'header__container__admin-link'
            }`}
          >
            {tab.text}
          </Link>
        ))}
        <div onClick={onOpenModal} className="header__container__admin-link">
          Log out
        </div>
      </div>
      <div className="mobile">
        <Link to={currentTab.route} onClick={() => setOpenMenu(!openMenu)}>
          {currentTab.text}
        </Link>
        <div
          className={`mobile__menu mobile__menu--${
            openMenu ? 'open' : 'closed'
          }`}
        >
          {tabs
            .filter((tab) => tab.text !== currentTab.text)
            .map((tab) => (
              <Link
                key={tab.text}
                to={tab.route}
                className=" mobile__menu-link"
                onClick={() => {
                  setCurrentTab(tab);
                  setOpenMenu(false);
                }}
              >
                {tab.text}
              </Link>
            ))}
          <div onClick={onOpenModal} className=" mobile__menu-link">
            Log out
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AdminNavbar);
