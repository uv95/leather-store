import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import './adminNavbar.scss';
import useLogout from '../../../hooks/useLogout';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import Modal from '../../../shared/ui/Modal/Modal';
import Button from '../../../shared/ui/Button/Button';

interface AdminNavbarProps {
  path: string;
}

const AdminNavbar = ({ path }: AdminNavbarProps) => {
  const logoutUser = useLogout();
  const tabs = [
    { text: 'Orders', route: RoutePath.ADMIN_ORDERS },
    { text: 'Items', route: RoutePath.ITEMS_MANAGEMENT },
    { text: 'Analytics', route: RoutePath.ANALYTICS },
    { text: 'Home', route: RoutePath.HOME },
  ];

  const [currentTab, setCurrentTab] = useState({
    text: 'Orders',
    route: RoutePath.ADMIN_ORDERS,
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
        {openModal && (
          <Modal
            setOpen={setOpenModal}
            Content={
              <>
                <p>Are you sure you want to log out?</p>
                <div className="modal__content__buttons">
                  <Button
                    onClick={() => {
                      logoutUser();
                      setOpenModal(false);
                    }}
                  >
                    Yes
                  </Button>
                  <Button onClick={() => setOpenModal(false)}>No</Button>
                </div>
              </>
            }
          />
        )}
        <div className="header__container__admin">
          {tabs.map((tab) => (
            <Link
              key={tab.text}
              to={tab.route}
              className={`${
                tab.route === path
                  ? 'header__container__admin-link-active'
                  : 'header__container__admin-link'
              }`}
            >
              {tab.text}
            </Link>
          ))}
          <div
            onClick={() => setOpenModal(true)}
            className="header__container__admin-link"
          >
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
            <div
              onClick={() => setOpenModal(true)}
              className=" mobile__menu-link"
            >
              Log out
            </div>
          </div>
        </div>
    </>
  );
};

export default memo(AdminNavbar);
