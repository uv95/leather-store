import { memo } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../../../shared/assets/icons/cart.svg';
import login from '../../../shared/assets/icons/sign-in.svg';
import userIcon from '../../../shared/assets/icons/user.svg';
import { ICart, IOrder, Role } from '../../../types/data';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import Badge from '../../../shared/ui/Badge/Badge';
import './header.scss';

interface HeaderProps {
  role: Role;
  myActiveOrders: IOrder[];
  cart: ICart | null;
}

const Header = ({ role, myActiveOrders, cart }: HeaderProps) => {
  return (
    <>
        <div className="header__container-inner">
          <Link to={RoutePath.HOME} className="header__container-inner__logo">
            ANNE LEATHER
          </Link>
          <div className="header__container-inner__nav">
            <Link
              to={RoutePath.CATALOG}
              className="header__container-inner__nav-catalog"
            >
              CATALOG
            </Link>
            <UserOrAdminLink role={role} myActiveOrders={myActiveOrders} />

            {role !== Role.ADMIN && (
              <Link to={RoutePath.CART} className="link-cart">
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
    </>
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
    if (!role) {
      return RoutePath.LOGIN;
    }
    return role === Role.USER ? RoutePath.USER_PROFILE : RoutePath.ADMIN_ORDERS;
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
          {role && myActiveOrders.length !== 0 && (
            <Badge value={myActiveOrders.length} />
          )}
        </>
      )}
    </Link>
  );
}
