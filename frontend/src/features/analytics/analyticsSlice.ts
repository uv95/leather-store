import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import analyticsService from './analyticsService';
import { extractErrorMessage } from '../../utils/errorMessage';

const initialState = {
  isLoading: false,
  monthlyRevenue: 0,
  ordersByCategory: null,
};

export const getMonthlyRevenueData = createAsyncThunk(
  '@@analytics/monthly-revenue',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await analyticsService.getMonthlyRevenue(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getAllOrdersByCategory = createAsyncThunk(
  '@@analytics/orders-by-category',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.auth.user;
      return await analyticsService.getOrdersByCategory(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const analyticsSlice = createSlice({
  name: '@@analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyRevenueData.fulfilled, (state, action) => {
        state.monthlyRevenue = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getMonthlyRevenueData.pending, (state) => {
        state.monthlyRevenue = 0;
        state.isLoading = true;
      })
      .addCase(getMonthlyRevenueData.rejected, (state) => {
        state.monthlyRevenue = 0;
        state.isLoading = false;
      })
      .addCase(getAllOrdersByCategory.fulfilled, (state, action) => {
        state.ordersByCategory = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getAllOrdersByCategory.pending, (state) => {
        state.ordersByCategory = null;
        state.isLoading = true;
      })
      .addCase(getAllOrdersByCategory.rejected, (state) => {
        state.ordersByCategory = null;
        state.isLoading = false;
      });
  },
});

export default analyticsSlice.reducer;
