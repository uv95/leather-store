import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/providers/StoreProvider/config/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
);
