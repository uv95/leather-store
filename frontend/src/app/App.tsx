import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import store from '../store';
import Toast from '../shared/ui/Toast/Toast';
import './styles/index.scss';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { AppRouter } from './providers/router';
import { MainLayout } from '../widgets/MainLayout';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Toast />
        <BrowserRouter>
          <MainLayout>
            <Suspense>
              <ScrollToTop />
              <AppRouter />
            </Suspense>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
