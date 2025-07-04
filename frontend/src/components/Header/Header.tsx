import { memo } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../../assets/icons/cart.svg';
import login from '../../assets/icons/sign-in.svg';
import userIcon from '../../assets/icons/user.svg';
import { ICart, IOrder, Role } from '../../types/data';
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  CATALOG_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../utils/consts';
import Badge from '../UI/Badge/Badge';
import './header.scss';

interface HeaderProps {
  role: Role;
  myActiveOrders: IOrder[];
  cart: ICart | null;
}

const Header = ({ role, myActiveOrders, cart }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container-inner">
          <Link to={HOME_ROUTE} className="header__container-inner__logo">
            ANNE LEATHER
          </Link>
          <div className="header__container-inner__nav">
            <Link
              to={CATALOG_ROUTE}
              className="header__container-inner__nav-catalog"
            >
              CATALOG
            </Link>
            <UserOrAdminLink role={role} myActiveOrders={myActiveOrders} />

            {role !== Role.ADMIN && (
              <Link to={CART_ROUTE} className="link-cart">
                <img
                  src={cartIcon}
                  className="header__container-inner__nav-icon "
                  alt="cart"
                />
                {cart && cart?.items.length && (
                  <Badge value={cart.totalQuantity} />
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);

function UserOrAdminLink({
  role,
  myActiveOrders,
}: {
  role: Role;
  myActiveOrders: IOrder[];
}) {
  const getHref = (role: Role) => {
    console.log('UserOrAdminLink');
    if (!role) {
      return LOGIN_ROUTE;
    }
    return role === Role.USER ? USER_PROFILE_ROUTE : ADMIN_ROUTE;
  };

  return (
    <Link to={getHref(role)} className={role === Role.USER ? 'link-user' : ''}>
      {role === Role.ADMIN ? (
        'ADMIN'
      ) : (
        <>
          <img
            src={!role ? login : userIcon}
            className="header__container-inner__nav-icon"
            alt={role ? 'login' : 'user_profile'}
          />
          {role && myActiveOrders.length && (
            <Badge value={myActiveOrders.length} />
          )}
        </>
      )}
    </Link>
  );
}
