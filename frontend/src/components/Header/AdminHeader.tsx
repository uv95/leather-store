import React from 'react';
import '../Header/header.scss';
import {
  HOME_ROUTE,
  ADMIN_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  STATISTICS_ROUTE,
} from '../../utils/consts';
import { Link, useLocation } from 'react-router-dom';

type Props = {};

const AdminHeader = (props: Props) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="header__container__admin">
      <Link
        to={ADMIN_ROUTE}
        className={`${
          ADMIN_ROUTE === path
            ? 'header__container__admin--link-active'
            : 'header__container__admin--link'
        }`}
      >
        Заказы
      </Link>
      <Link
        to={ITEMS_MANAGEMENT_ROUTE}
        className={`${
          ITEMS_MANAGEMENT_ROUTE === path
            ? 'header__container__admin--link-active'
            : 'header__container__admin--link'
        }`}
      >
        Управление товарами
      </Link>
      <Link
        to={STATISTICS_ROUTE}
        className={`${
          STATISTICS_ROUTE === path
            ? 'header__container__admin--link-active'
            : 'header__container__admin--link'
        }`}
      >
        Статистика
      </Link>
      <Link to={HOME_ROUTE} className="header__container__admin--link">
        На главную
      </Link>
    </div>
  );
};

export default AdminHeader;
