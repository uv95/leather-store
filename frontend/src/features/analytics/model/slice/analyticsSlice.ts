import { createSlice } from '@reduxjs/toolkit';
import { AnalyticsSchema } from '../types/analytics';
import { getOrdersByCategory } from '../services/getOrdersByCategory/getOrdersByCategory';
import { getMonthlyRevenueData } from '../services/getMonthlyRevenueData/getMonthlyRevenueData';

const initialState: AnalyticsSchema = {
  monthlyRevenue: [],
  ordersByCategory: [],
  loading: 'idle',
};

export const analyticsSlice = createSlice({
  name: '@@analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyRevenueData.fulfilled, (state, action) => {
        state.monthlyRevenue = action.payload.data;
        state.loading = 'succeeded';
      })
      .addCase(getMonthlyRevenueData.pending, (state) => {
        state.monthlyRevenue = [];
        state.loading = 'pending';
      })
      .addCase(getMonthlyRevenueData.rejected, (state) => {
        state.monthlyRevenue = [];
        state.loading = 'failed';
      })
      .addCase(getOrdersByCategory.fulfilled, (state, action) => {
        state.ordersByCategory = action.payload.data;
        state.loading = 'succeeded';
      })
      .addCase(getOrdersByCategory.pending, (state) => {
        state.ordersByCategory = [];
        state.loading = 'pending';
      })
      .addCase(getOrdersByCategory.rejected, (state) => {
        state.ordersByCategory = [];
        state.loading = 'failed';
      });
  },
});

export default analyticsSlice.reducer;
