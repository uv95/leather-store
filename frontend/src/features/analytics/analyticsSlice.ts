import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import analyticsService from './analyticsService';
import { extractErrorMessage } from '../../shared/lib/extractErrorMessage/errorMessage';
import { MonthleRevenue, OrdersByCategory } from '../../types/data';

interface InitialState {
  isLoading: boolean;
  monthlyRevenue: MonthleRevenue[];
  ordersByCategory: OrdersByCategory[];
}

const initialState: InitialState = {
  isLoading: false,
  monthlyRevenue: [],
  ordersByCategory: [],
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
        state.monthlyRevenue = [];
        state.isLoading = true;
      })
      .addCase(getMonthlyRevenueData.rejected, (state) => {
        state.monthlyRevenue = [];
        state.isLoading = false;
      })
      .addCase(getAllOrdersByCategory.fulfilled, (state, action) => {
        state.ordersByCategory = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getAllOrdersByCategory.pending, (state) => {
        state.ordersByCategory = [];
        state.isLoading = true;
      })
      .addCase(getAllOrdersByCategory.rejected, (state) => {
        state.ordersByCategory = [];
        state.isLoading = false;
      });
  },
});

export default analyticsSlice.reducer;
