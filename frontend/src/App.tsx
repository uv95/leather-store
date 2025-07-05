import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout/MainLayout';
import Router from './components/Router';
import ScrollToTop from './components/ScrollToTop';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Suspense>
            <ScrollToTop />
            <Router />
          </Suspense>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
