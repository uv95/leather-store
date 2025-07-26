import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout/MainLayout';
import Router from '../components/Router';
import ScrollToTop from '../components/ScrollToTop';
import store from '../store';
import Toast from '../shared/ui/Toast/Toast';
import ErrorBoundary from '../components/ErrorBoundary';
import './styles/index.scss';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Toast />
        <BrowserRouter>
          <MainLayout>
            <Suspense>
              <ScrollToTop />
              <Router />
            </Suspense>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
