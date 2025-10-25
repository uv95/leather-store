import { configureStore } from '@reduxjs/toolkit';
import { addressReducer } from '../../../../entities/Address';
import { cartReducer } from '../../../../entities/Cart';
import { itemsReducer } from '../../../../entities/Item';
import { orderReducer } from '../../../../entities/Order';
import { userReducer } from '../../../../entities/User';
import { filterReducer } from '../../../../features/CatalogFilter';
import { analyticsReducer } from '../../../../features/analytics';
import { authReducer } from '../../../../features/auth';
import { paymentReducer } from '../../../../features/payment';
import { $api } from '../../../../shared/api/api';
import { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
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
      payment: paymentReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    preloadedState: initialState,
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
