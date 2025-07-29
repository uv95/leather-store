import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';
import { userReducer } from './entities/User';
import { addressReducer } from './entities/Address';
import cartReducer from './features/cart/cartSlice';
import { itemsReducer } from './entities/Item';
import filtersReducer from './features/filters/filtersSlice';
import { analyticsReducer } from './features/analytics';
import { orderReducer } from './entities/Order';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    items: itemsReducer,
    address: addressReducer,
    cart: cartReducer,
    orders: orderReducer,
    filters: filtersReducer,
    analytics: analyticsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
