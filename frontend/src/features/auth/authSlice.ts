import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { extractErrorMessage } from '../../utils/errorMessage';
import { IRegister, ILogin, IUpdatedAuth } from '../../types/data';
import { RootState } from '../../store';

const userStr = localStorage.getItem('user');
let user = null;
if (userStr) user = JSON.parse(userStr);

const initialState = {
  user: user || null,
  isLoading: false,
};

export const register = createAsyncThunk(
  '@@auth/register',
  async (user: IRegister, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const login = createAsyncThunk(
  '@@auth/login',
  async (user: ILogin, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updatePassword = createAsyncThunk(
  '@auth/updatePassword',
  async (updatedData: IUpdatedAuth, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await authService.updatePassword(token, updatedData);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload.data.user };
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
        // state.user=
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
