import React, { useState } from 'react';
import '../Header/header.scss';
import {
  HOME_ROUTE,
  ADMIN_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  STATISTICS_ROUTE,
} from '../../utils/consts';
import { Link, useLocation } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

const AdminHeader = () => {
  const location = useLocation();
  const path = location.pathname;
  const logoutUser = useLogout();
  const tabs = [
    { text: 'Заказы', route: ADMIN_ROUTE },
    { text: 'Товары', route: ITEMS_MANAGEMENT_ROUTE },
    { text: 'Статистика', route: STATISTICS_ROUTE },
    { text: 'На главную', route: HOME_ROUTE },
  ];

  const [currentTab, setCurrentTab] = useState({
    text: 'Заказы',
    route: ADMIN_ROUTE,
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
              <p>Вы действительно хотите выйти?</p>
              <div className="modal__content__buttons">
                <Button
                  text="Да"
                  color="grey"
                  onClick={() => {
                    logoutUser();
                    setOpenModal(false);
                  }}
                />
                <Button
                  text="Нет"
                  color="grey"
                  onClick={() => setOpenModal(false)}
                />
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
          Выйти
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
            Выйти
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
