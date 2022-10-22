import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService, { RegisterData, LoginData } from './authService';
import { extractErrorMessage } from '../../utils/errorMessage';

const userStr = localStorage.getItem('user');
let user = null;
if (userStr) user = JSON.parse(userStr);

interface AuthState {
  user: RegisterData | LoginData | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: user || null,
  isLoading: false,
};

export const register = createAsyncThunk(
  '@@auth/register',
  async (user: RegisterData, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const login = createAsyncThunk(
  '@@auth/login',
  async (user: LoginData, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const logout = createAction<any>('@@auth/logout', () => {
  authService.logout();
  return {};
});

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
