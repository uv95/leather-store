import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { extractErrorMessage } from '../../utils/errorMessage';
import userService from './userService';

const initialState = {
  users: [],
  isLoading: false,
};

export const getMe = createAsyncThunk('@user/getMe', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.auth.user;
    return await userService.getMe(token);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});
export const getRole = createAsyncThunk(
  '@user/getRole',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const role = state.auth.user.data.user.role;
      return role;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getRole.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(getRole.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //     })
  //     .addCase(getRole.rejected, (state) => {
  //       state.isLoading = false;
  //     });
  // },
});

export default userSlice.reducer;
