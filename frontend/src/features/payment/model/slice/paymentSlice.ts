import { createSlice } from '@reduxjs/toolkit';
import { cancelPayment } from '../services/cancelPayment/cancelPayment';
import { confirmPayment } from '../services/confirmPayment/confirmPayment';
import { createPayment } from '../services/createPayment/createPayment';
import { getAllPayments } from '../services/getAllPayments/getAllPayments';
import { getPayment } from '../services/getPayment/getPayment';
import { PaymentSchema } from '../types/payment';
import { retrievePaymentIntent } from '../services/retrievePaymentIntent/retrievePaymentIntent';

const initialState: PaymentSchema = {
  payments: [],
  payment: undefined,
  clientSecret: undefined,
  paymentIntentId: undefined,
  loading: 'idle',
};

export const paymentSlice = createSlice({
  name: '@@payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelPayment.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(cancelPayment.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(cancelPayment.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(confirmPayment.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(confirmPayment.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(confirmPayment.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(createPayment.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        const { clientSecret, paymentIntentId } = action.payload.data;

        state.loading = 'succeeded';
        state.clientSecret = clientSecret;
        state.paymentIntentId = paymentIntentId;
      })
      .addCase(createPayment.rejected, (state) => {
        state.loading = 'failed';
        state.clientSecret = undefined;
        state.paymentIntentId = undefined;
      })
      .addCase(getAllPayments.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.payments = action.payload.data;
      })
      .addCase(getAllPayments.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(getPayment.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getPayment.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.payment = action.payload.data;
        state.paymentIntentId = action.payload.data.paymentIntentId;
      })
      .addCase(getPayment.rejected, (state) => {
        state.loading = 'failed';
        state.payment = undefined;
        state.paymentIntentId = undefined;
      })
      .addCase(retrievePaymentIntent.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(retrievePaymentIntent.fulfilled, (state, action) => {
        const { id, clientSecret } = action.payload.data;

        state.loading = 'succeeded';
        state.paymentIntentId = id;
        state.clientSecret = clientSecret;
      })
      .addCase(retrievePaymentIntent.rejected, (state) => {
        state.loading = 'failed';
        state.paymentIntentId = undefined;
        state.clientSecret = undefined;
      });
  },
});

export default paymentSlice.reducer;
