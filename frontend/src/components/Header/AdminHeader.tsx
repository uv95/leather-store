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

type Props = {};

const AdminHeader = (props: Props) => {
  const location = useLocation();
  const path = location.pathname;
  const logoutUser = useLogout();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && (
        <Modal
          setOpen={setOpenModal}
          Content={
            <div className="myOrderDetails__modal">
              <p>Вы действительно хотите выйти?</p>
              <div className="myOrderDetails__modal__buttons">
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
            </div>
          }
        />
      )}
      <div className="header__container__admin">
        <div className="header__container__admin__links">
          <Link
            to={ADMIN_ROUTE}
            className={`${
              ADMIN_ROUTE === path
                ? 'header__container__admin__links--link-active'
                : 'header__container__admin__links--link'
            }`}
          >
            Заказы
          </Link>
          <Link
            to={ITEMS_MANAGEMENT_ROUTE}
            className={`${
              ITEMS_MANAGEMENT_ROUTE === path
                ? 'header__container__admin__links--link-active'
                : 'header__container__admin__links--link'
            }`}
          >
            Управление товарами
          </Link>
          <Link
            to={STATISTICS_ROUTE}
            className={`${
              STATISTICS_ROUTE === path
                ? 'header__container__admin__links--link-active'
                : 'header__container__admin__links--link'
            }`}
          >
            Статистика
          </Link>
          <Link
            to={HOME_ROUTE}
            className="header__container__admin__links--link"
          >
            На главную
          </Link>
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="header__container__admin-logout"
        >
          Выйти
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
