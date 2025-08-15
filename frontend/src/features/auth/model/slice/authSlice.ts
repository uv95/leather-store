import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from '../../../../shared/const/consts';
import { login } from '../services/login/login';
import { signup } from '../services/signup/signup';
import { updatePassword } from '../services/updatePassword/updatePassword';
import { AuthSchema } from '../types/auth';
import { logout } from '../../../../entities/User';

const token = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
let isLoggedIn = false;

if (token) {
  isLoggedIn = true;
}

const initialState: AuthSchema = {
  isLoggedIn,
  loading: 'idle',
};

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = 'succeeded';
        state.isLoggedIn = true;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = 'succeeded';
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = 'succeeded';
        state.isLoggedIn = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export default authSlice.reducer;
