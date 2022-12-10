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
import user from '../../assets/icons/user.svg';
import login from '../../assets/icons/sign-in.svg';
import AdminHeader from './AdminHeader';
import Badge from '../UI/Badge/Badge';
import useGetMyOrders from '../../hooks/useGetMyOrders';
import { useAppSelector } from '../../hooks';
import useGetMe from '../../hooks/useGetMe';
import useGetCart from '../../hooks/useGetCart';

const Header = () => {
  const role = useAppSelector((state) => state.auth.role);
  const { user: currentUser } = useGetMe();
  const { myActiveOrders } = useGetMyOrders(currentUser?._id!);
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
              {!role ? (
                <>
                  <Link to={LOGIN_ROUTE}>
                    <img
                      src={login}
                      className="header__container-inner__nav-icon"
                      alt="login"
                    />
                  </Link>
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
                </>
              ) : role === 'user' ? (
                <>
                  <Link to={USER_PROFILE_ROUTE} className="link-user">
                    <img
                      src={user}
                      className="header__container-inner__nav-icon
                     "
                      alt="user_profile"
                    />
                    {myActiveOrders.length !== 0 && (
                      <Badge value={myActiveOrders.length} />
                    )}
                  </Link>
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
                </>
              ) : (
                <Link to={ADMIN_ROUTE}>ADMIN</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
