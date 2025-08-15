import { Suspense, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCart, getCartItemsLS } from '../entities/Cart';
import { getUser } from '../entities/User';
import { getIsLoggedIn } from '../features/auth';
import { useAppDispatch } from '../shared/lib/hooks/useAppDispatch';
import { useScrollToTop } from '../shared/lib/hooks/useScrollToTop';
import toast from '../shared/lib/toast/toast';
import Toast from '../shared/ui/Toast/Toast';
import { MainLayout } from '../widgets/MainLayout';
import { AppRouter } from './providers/router';
import './styles/index.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  useScrollToTop();

  const init = useCallback(() => {
    if (isLoggedIn) {
      dispatch(getUser())
        .unwrap()
        .then(() => dispatch(getCart()))
        .catch((error) => toast.error(error));
    } else {
      dispatch(getCartItemsLS());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Suspense>
      <Toast />
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </Suspense>
  );
};

export default App;
