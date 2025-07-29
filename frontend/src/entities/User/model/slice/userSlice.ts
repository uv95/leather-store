import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../services/getUser/getUser';
import { updateUser } from '../services/updateUser/updateUser';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
  user: undefined,
  isLoading: false,
};

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.user = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.data;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload.data.user };
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
