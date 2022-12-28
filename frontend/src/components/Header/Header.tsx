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
import cartIcon from '../../assets/icons/cart.svg';
import userIcon from '../../assets/icons/user.svg';
import login from '../../assets/icons/sign-in.svg';
import AdminHeader from './AdminHeader';
import Badge from '../UI/Badge/Badge';
import useGetMyOrders from '../../hooks/useGetMyOrders';
import { useAppSelector } from '../../hooks';
import useGetCart from '../../hooks/useGetCart';

const Header = () => {
  const { role, user } = useAppSelector((state) => state.auth);
  const { myActiveOrders } = useGetMyOrders(user?.data.user.id);
  const { cart } = useGetCart();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        {location.pathname.startsWith('/admin') && role === 'admin' ? (
          <AdminHeader />
        ) : (
          <div className="header__container-inner">
            <Link to={HOME_ROUTE} className="header__container-inner__logo">
              ANNE LEATHER
            </Link>
            <div className="header__container-inner__nav">
              <Link
                to={CATALOG_ROUTE}
                className="header__container-inner__nav-catalog"
              >
                КАТАЛОГ
              </Link>
              <Link
                to={
                  !role
                    ? LOGIN_ROUTE
                    : role === 'user'
                    ? USER_PROFILE_ROUTE
                    : ADMIN_ROUTE
                }
                className={role === 'user' ? 'link-user' : ''}
              >
                {role === 'admin' ? (
                  'ADMIN'
                ) : (
                  <>
                    <img
                      src={!role ? login : userIcon}
                      className="header__container-inner__nav-icon"
                      alt={role ? 'login' : 'user_profile'}
                    />
                    {role && myActiveOrders.length !== 0 && (
                      <Badge value={myActiveOrders.length} />
                    )}
                  </>
                )}
              </Link>
              {role !== 'admin' && (
                <Link to={CART_ROUTE} className="link-cart">
                  <img
                    src={cartIcon}
                    className="header__container-inner__nav-icon "
                    alt="cart"
                  />
                  {cart && cart?.items.length !== 0 && (
                    <Badge value={cart.totalQuantity} />
                  )}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
