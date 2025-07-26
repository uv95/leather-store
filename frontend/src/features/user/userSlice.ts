import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import userService from './userService';
import { IUser, IUserState } from '../../types/data';
import { extractErrorMessage } from '../../shared/lib/extractErrorMessage/errorMessage';

const initialState: IUserState = {
  user: null,
  users: [],
  isLoading: false,
};

export const getMe = createAsyncThunk('@user/getMe', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.auth.user;
    return await userService.getMe(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});
export const updateMe = createAsyncThunk(
  '@user/updateMe',
  async (updatedData: Partial<IUser>, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await userService.updateMe(token, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.data;
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload.data.user };
      })
      .addCase(updateMe.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
