import { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import useGetCart from '../../../hooks/useGetCart';
import useGetMyOrders from '../../../hooks/useGetMyOrders';
import { Role } from '../../../types/data';
import Footer from '../../Footer/Footer';
import AdminHeader from '../../Header/AdminHeader';
import Header from '../../Header/Header';

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
      {isAdminPage ? (
        <AdminHeader path={location.pathname} />
      ) : (
        <Header role={role} myActiveOrders={myActiveOrders} cart={cart} />
      )}

      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
