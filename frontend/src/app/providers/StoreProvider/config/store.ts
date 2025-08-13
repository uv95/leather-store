import { configureStore } from '@reduxjs/toolkit';
import { NavigateOptions, To } from 'react-router-dom';
import { addressReducer } from '../../../../entities/Address';
import { cartReducer } from '../../../../entities/Cart';
import { itemsReducer } from '../../../../entities/Item';
import { orderReducer } from '../../../../entities/Order';
import { userReducer } from '../../../../entities/User';
import { filterReducer } from '../../../../features/CatalogFilter';
import { analyticsReducer } from '../../../../features/analytics';
import { authReducer } from '../../../../features/auth';
import { $api } from '../../../../shared/api/api';
import { ThunkExtraArg } from './StateSchema';

export function createReduxStore(
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      items: itemsReducer,
      address: addressReducer,
      cart: cartReducer,
      orders: orderReducer,
      filters: filterReducer,
      analytics: analyticsReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaulMiddleware) =>
      getDefaulMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });

  return store;
}

export type RootState = ReturnType<typeof createReduxStore>;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
