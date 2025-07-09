import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  ANALYTICS_ROUTE,
} from '../../utils/consts';
import '../Header/header.scss';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

interface AdminHeaderProps {
  path: string;
}

const AdminHeader = ({ path }: AdminHeaderProps) => {
  const logoutUser = useLogout();
  const tabs = [
    { text: 'Orders', route: ADMIN_ROUTE },
    { text: 'Items', route: ITEMS_MANAGEMENT_ROUTE },
    { text: 'Analytics', route: ANALYTICS_ROUTE },
    { text: 'Home', route: HOME_ROUTE },
  ];

  const [currentTab, setCurrentTab] = useState({
    text: 'Orders',
    route: ADMIN_ROUTE,
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
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
      </div>
    </header>
  );
};

export default memo(AdminHeader);
