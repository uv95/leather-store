import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import useGetCart from '../../../hooks/useGetCart';
import useGetMyOrders from '../../../hooks/useGetMyOrders';
import { Role } from '../../../types/data';
import Footer from '../../Footer/Footer';
import AdminHeader from '../../Header/AdminHeader';
import Header from '../../Header/Header';

function MainLayout({ role }: { role: any }) {
  const { user } = useAppSelector((state) => state.auth);
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

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
