import { ReactNode, useMemo } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import { useLocation } from 'react-router-dom';
import useGetCart from '../../../hooks/useGetCart';
import useGetMyOrders from '../../../hooks/useGetMyOrders';
import { useAppSelector } from '../../../hooks';
import { Role } from '../../../types/data';
import AdminHeader from '../../Header/AdminHeader';

function MainLayout({ children }: { children: ReactNode }) {
  const { role, user } = useAppSelector((state) => state.auth);
  const { myActiveOrders } = useGetMyOrders(user?.data.user.id);
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
