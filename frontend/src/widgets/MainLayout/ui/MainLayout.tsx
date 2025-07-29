import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUserRole, Role } from '../../../entities/User';
import { AdminNavbar } from '../../AdminNavbar';
import { Header } from '../../Header';
import Footer from '../../../shared/ui/Footer/Footer';
import './mainLayout.scss';

function MainLayout({ children }: { children: ReactNode }) {
  const role = useSelector(getUserRole);
  const location = useLocation();

  const isAdminPage = useMemo(
    () => location.pathname.startsWith('/admin') && role === Role.ADMIN,
    [location, role]
  );

  return (
    <>
      <header className="header">
        <div className="header__container">
          {isAdminPage ? <AdminNavbar /> : <Header />}
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
