import { Suspense, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScrollToTop from '../components/ScrollToTop';
import { getCart, getCartLS } from '../entities/Cart';
import { getUser } from '../entities/User';
import { getIsLoggedIn } from '../features/auth';
import { useAppDispatch } from '../hooks';
import toast from '../shared/lib/toast/toast';
import Toast from '../shared/ui/Toast/Toast';
import { MainLayout } from '../widgets/MainLayout';
import { AppRouter } from './providers/router';
import './styles/index.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const init = useCallback(() => {
    if (isLoggedIn) {
      dispatch(getUser())
        .unwrap()
        .then(() => dispatch(getCart()))
        .catch((error) => toast.error(error));
    } else {
      dispatch(getCartLS());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    init();
  }, [init]);

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
