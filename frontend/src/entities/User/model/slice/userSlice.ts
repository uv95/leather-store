import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from '../../../../shared/const/consts';
import { getUser } from '../services/getUser/getUser';
import { updateUser } from '../services/updateUser/updateUser';
import { User, UserSchema } from '../types/user';
import { deleteUser } from '../services/deleteUser/deleteUser';

const initialState: UserSchema = {
  user: undefined,
  loading: 'idle',
};

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = undefined;
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = 'pending';
        state.user = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = 'succeeded';
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = 'succeeded';
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = undefined;
        state.loading = 'succeeded';
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;
