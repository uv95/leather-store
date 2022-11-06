import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import itemsReducer from './features/items/itemsSlice';
import addressReducer from './features/address/addressSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    items: itemsReducer,
    address: addressReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
