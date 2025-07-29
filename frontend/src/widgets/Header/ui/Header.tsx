import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserActiveOrders, getUserOrders } from '../../../entities/Order';
import { getUserRole, getUserSelector, Role } from '../../../entities/User';
import useGetCart from '../../../hooks/useGetCart';
import cartIcon from '../../../shared/assets/icons/cart.svg';
import login from '../../../shared/assets/icons/sign-in.svg';
import userIcon from '../../../shared/assets/icons/user.svg';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import Badge from '../../../shared/ui/Badge/Badge';
import './header.scss';
import { useAppDispatch } from '../../../hooks';
import toast from '../../../shared/lib/toast/toast';

const Header = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(getUserSelector);
  const role = useSelector(getUserRole);
  const { cart } = useGetCart();

  useEffect(() => {
    if (role === Role.USER && user?._id) {
      dispatch(getUserOrders(user?._id))
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
    }
  }, [dispatch, user?._id, role]);

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
          <UserOrAdminLink />

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

function UserOrAdminLink() {
  const user = useSelector(getUserSelector);
  const role = useSelector(getUserRole);
  const userActiveOrders = useSelector(getUserActiveOrders);

  const getHref = (role: Role) => {
    if (!user) {
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
            src={!user ? login : userIcon}
            className="header__container-inner__nav-icon"
            alt={!user ? 'login' : 'user_profile'}
          />
          {user && userActiveOrders.length !== 0 && (
            <Badge value={userActiveOrders.length} />
          )}
        </>
      )}
    </Link>
  );
}
