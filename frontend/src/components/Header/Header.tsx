import React from 'react';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import {
  CART_ROUTE,
  CATALOG_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
} from '../../utils/consts';
import cart from '../../assets/icons/cart.svg';
import user from '../../assets/icons/user.svg';
import login from '../../assets/icons/sign-in.svg';
import AdminHeader from './AdminHeader';

type Props = {};

const Header = (props: Props) => {
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
              <Link to={LOGIN_ROUTE}>
                <img
                  src={login}
                  className="header__container-inner__nav-icon"
                  alt="login"
                />
                {/* <img
                src={user}
                className="header__container-inner__nav-icon"
                alt="user_profile"
              /> */}
              </Link>
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
