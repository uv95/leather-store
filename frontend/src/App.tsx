import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import ScrollToTop from './components/ScrollToTop';
import Spinner from './components/UI/Spinner/Spinner';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Spinner />}>
          <Router />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
