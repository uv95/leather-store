import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUserLoading, getUserRole, Role } from '../../../entities/User';
import { AdminNavbar } from '../../AdminNavbar';
import { Header } from '../../Header';
import Footer from '../../../shared/ui/Footer/Footer';
import './mainLayout.scss';

function MainLayout({ children }: { children: ReactNode }) {
  const role = useSelector(getUserRole);
  const loading = useSelector(getUserLoading);
  const location = useLocation();

  const isAdminPage = useMemo(
    () => location.pathname.startsWith('/admin') && role === Role.ADMIN,
    [location, role]
  );

  const dynamicHeader = isAdminPage ? <AdminNavbar /> : <Header />;

  return (
    <>
      <header className="header">
        <div className="header__container">
          {loading === 'succeeded' ? dynamicHeader : <Header />}
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
