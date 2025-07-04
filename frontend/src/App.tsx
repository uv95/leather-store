import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import ScrollToTop from './components/ScrollToTop';
import Spinner from './components/UI/Spinner/Spinner';
import MainLayout from './components/layouts/MainLayout/MainLayout';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <ScrollToTop />
          <Suspense fallback={<Spinner />}>
            <Router />
          </Suspense>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
