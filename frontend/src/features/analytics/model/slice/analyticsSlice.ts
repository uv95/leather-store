import { createSlice } from '@reduxjs/toolkit';
import { AnalyticsSchema } from '../types/analytics';
import { getOrdersByCategory } from '../services/getOrdersByCategory/getOrdersByCategory';
import { getMonthlyRevenueData } from '../services/getMonthlyRevenueData/getMonthlyRevenueData';

const initialState: AnalyticsSchema = {
  isLoading: false,
  monthlyRevenue: [],
  ordersByCategory: [],
};

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
      .addCase(getOrdersByCategory.fulfilled, (state, action) => {
        state.ordersByCategory = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getOrdersByCategory.pending, (state) => {
        state.ordersByCategory = [];
        state.isLoading = true;
      })
      .addCase(getOrdersByCategory.rejected, (state) => {
        state.ordersByCategory = [];
        state.isLoading = false;
      });
  },
});

export default analyticsSlice.reducer;
