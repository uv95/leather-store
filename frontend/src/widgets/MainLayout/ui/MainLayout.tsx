import { ReactNode } from 'react';
import Footer from '../../../shared/ui/Footer/Footer';
import { Header } from '../../Header';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
