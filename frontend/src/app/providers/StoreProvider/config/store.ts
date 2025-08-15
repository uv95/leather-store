import { configureStore } from '@reduxjs/toolkit';
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

export function createReduxStore() {
  const extraArg: ThunkExtraArg = {
    api: $api,
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

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
