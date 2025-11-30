import { ReactNode } from 'react';
import Footer from '../../../shared/ui/Footer/Footer';
import { Header } from '../../Header';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
