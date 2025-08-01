import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../../../features/auth';
import { userReducer } from '../../../../entities/User';
import { addressReducer } from '../../../../entities/Address';
import { cartReducer } from '../../../../entities/Cart';
import { itemsReducer } from '../../../../entities/Item';
import { filterReducer } from '../../../../features/CatalogFilter';
import { analyticsReducer } from '../../../../features/analytics';
import { orderReducer } from '../../../../entities/Order';

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
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
