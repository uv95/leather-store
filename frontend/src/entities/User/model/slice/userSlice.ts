import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from '../../../../shared/const/consts';
import { getUser } from '../services/getUser/getUser';
import { updateUser } from '../services/updateUser/updateUser';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  user: undefined,
  isLoading: false,
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

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;
