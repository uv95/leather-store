import { ReactNode, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUserActiveOrders, getUserOrders } from '../../../entities/Order';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useGetCart from '../../../hooks/useGetCart';
import toast from '../../../shared/lib/toast/toast';
import Footer from '../../../shared/ui/Footer/Footer';
import { Role } from '../../../types/data';
import { AdminNavbar } from '../../AdminNavbar';
import { Header } from '../../Header';
import './mainLayout.scss';

function MainLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { role, user } = useAppSelector((state) => state.auth);
  const userActiveOrders = useSelector(getUserActiveOrders);
  const { cart } = useGetCart();
  const location = useLocation();
  const userId = user?.data.user._id;

  const isAdminPage = useMemo(
    () => location.pathname.startsWith('/admin') && role === Role.ADMIN,
    [location, role]
  );

  useEffect(() => {
    role === Role.USER &&
      userId &&
      dispatch(getUserOrders(userId))
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
  }, [dispatch, userId, role]);

  return (
    <>
      <header className="header">
        <div className="header__container">
          {isAdminPage ? (
            <AdminNavbar path={location.pathname} />
          ) : (
            <Header role={role} myActiveOrders={userActiveOrders} cart={cart} />
          )}
        </div>
      </header>

      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
