import { Suspense, useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import Toast from '../shared/ui/Toast/Toast';
import { MainLayout } from '../widgets/MainLayout';
import { AppRouter } from './providers/router';
import './styles/index.scss';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../features/auth';
import { useAppDispatch } from '../hooks';
import { getUser } from '../entities/User';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <Suspense>
      <Toast />
      <ScrollToTop />
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </Suspense>
  );
};

export default App;
