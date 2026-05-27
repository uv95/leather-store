import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCartItemCount,
  getCartId,
  getCartItemCountSelector,
} from '../../../entities/Cart';
import {
  getUserActiveOrderCount,
  getUserActiveOrderCountSelector,
} from '../../../entities/Order';
import { getUserRole, getUserSelector, Role } from '../../../entities/User';
import { ReactComponent as AdminIcon } from '../../../shared/assets/icons/admin.svg';
import { ReactComponent as CartIcon } from '../../../shared/assets/icons/cart.svg';
import { ReactComponent as LoginIcon } from '../../../shared/assets/icons/sign-in.svg';
import { ReactComponent as UserIcon } from '../../../shared/assets/icons/user.svg';
import { RoutePath } from '../../../shared/types/routePaths';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../shared/lib/toast/toast';
import Badge from '../../../shared/ui/Badge/Badge';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(getUserSelector);
  const cartItemCount = useSelector(getCartItemCountSelector);
  const cartId = useSelector(getCartId);

  useEffect(() => {
    if (user?.role === Role.USER) {
      dispatch(getUserActiveOrderCount(user._id))
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
    }
  }, [dispatch, user?.role, user?._id]);

  useEffect(() => {
    if (cartId) {
      dispatch(getCartItemCount({ cartId }));
    }
  }, [dispatch, cartId]);

  return (
    <header className={styles.Header}>
      <Link
        to={RoutePath.HOME}
        className={styles.logo}
        aria-label="Go to homepage"
      >
        ANNE LEATHER
      </Link>
      <div className={styles.navbar}>
        <Link to={RoutePath.CATALOG} className={styles.catalogLink}>
          CATALOG
        </Link>
        <UserOrAdminLink />

        {user?.role !== Role.ADMIN && (
          <Link
            to={RoutePath.CART}
            className={styles.cartLink}
            aria-label={
              cartItemCount
                ? `Cart, ${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'}`
                : 'Cart'
            }
          >
            <CartIcon className={styles.icon} aria-hidden="true" />
            {cartItemCount !== 0 && (
              <Badge value={cartItemCount} aria-hidden="true" />
            )}
          </Link>
        )}
      </div>
    </header>
  );
};

export default memo(Header);

function UserOrAdminLink() {
  const user = useSelector(getUserSelector);
  const role = useSelector(getUserRole);
  const userActiveOrderCount = useSelector(getUserActiveOrderCountSelector);

  const getHref = (role: Role) => {
    if (!user) {
      return RoutePath.LOGIN;
    }
    return role === Role.USER
      ? RoutePath.USER_PROFILE
      : RoutePath.ADMIN_PROFILE;
  };

  return (
    <Link
      to={getHref(role)}
      className={role === Role.USER ? styles.userLink : ''}
      aria-label={
        role === Role.ADMIN ? 'Admin profile' : user ? 'My profile' : 'Log in'
      }
    >
      {role === Role.ADMIN ? (
        <AdminIcon className={styles.icon} aria-hidden="true" />
      ) : (
        <>
          {user ? (
            <UserIcon className={styles.icon} aria-hidden="true" />
          ) : (
            <LoginIcon className={styles.icon} aria-hidden="true" />
          )}
          {user && userActiveOrderCount !== 0 && (
            <Badge
              value={userActiveOrderCount}
              label={`active ${
                userActiveOrderCount === 1 ? 'order' : 'orders'
              }`}
            />
          )}
        </>
      )}
    </Link>
  );
}
