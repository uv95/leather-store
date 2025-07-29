import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from '../../../../shared/const/consts';
import { login } from '../services/login/login';
import { register } from '../services/register/register';
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
  isLoading: false,
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
