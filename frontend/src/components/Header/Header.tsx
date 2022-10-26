import React from 'react';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  CATALOG_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../utils/consts';
import cart from '../../assets/icons/cart.svg';
import user from '../../assets/icons/user.svg';
import login from '../../assets/icons/sign-in.svg';
import AdminHeader from './AdminHeader';
import { useDefineRole } from '../../hooks/useDefineRole';

type Props = {};

const Header = (props: Props) => {
  const role = useDefineRole();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        {location.pathname.startsWith('/admin') ? (
          <AdminHeader />
        ) : (
          <div className="header__container-inner">
            <Link to={HOME_ROUTE} className="header__container-inner__logo">
              ANNE LEATHER
            </Link>
            <div className="header__container-inner__nav">
              <Link
                to={CATALOG_ROUTE}
                className="header__container-inner__nav-shop"
              >
                КАТАЛОГ
              </Link>
              {!role ? (
                <Link to={LOGIN_ROUTE}>
                  <img
                    src={login}
                    className="header__container-inner__nav-icon"
                    alt="login"
                  />
                </Link>
              ) : role === 'user' ? (
                <Link to={USER_PROFILE_ROUTE}>
                  <img
                    src={user}
                    className="header__container-inner__nav-icon"
                    alt="user_profile"
                  />
                </Link>
              ) : (
                <Link to={ADMIN_ROUTE}>ADMIN</Link>
              )}
              <Link to={CART_ROUTE}>
                <img
                  src={cart}
                  className="header__container-inner__nav-icon"
                  alt="cart"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
