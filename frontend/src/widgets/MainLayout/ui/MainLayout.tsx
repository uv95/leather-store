import { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import useGetCart from '../../../hooks/useGetCart';
import useGetMyOrders from '../../../hooks/useGetMyOrders';
import { Role } from '../../../types/data';
import './mainLayout.scss';
import { AdminNavbar } from '../../AdminNavbar';
import { Header } from '../../Header';
import Footer from '../../../shared/ui/Footer/Footer';

function MainLayout({ children }: { children: ReactNode }) {
  const { role } = useAppSelector((state) => state.auth);
  const { myActiveOrders } = useGetMyOrders();
  const { cart } = useGetCart();
  const location = useLocation();

  const isAdminPage = useMemo(
    () => location.pathname.startsWith('/admin') && role === Role.ADMIN,
    [location, role]
  );

  return (
    <>
      <header className="header">
        <div className="header__container">
          {isAdminPage ? (
            <AdminNavbar path={location.pathname} />
          ) : (
            <Header role={role} myActiveOrders={myActiveOrders} cart={cart} />
          )}
        </div>
      </header>

      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
