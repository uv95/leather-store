import { PaymentSchema } from '../types/payment';
import paymentSlice from './paymentSlice';
import { createPayment } from '../services/createPayment/createPayment';
import { getAllPayments } from '../services/getAllPayments/getAllPayments';
import { getPayment } from '../services/getPayment/getPayment';
import { cancelPayment } from '../services/cancelPayment/cancelPayment';
import { confirmPayment } from '../services/confirmPayment/confirmPayment';
import { retrievePaymentIntent } from '../services/retrievePaymentIntent/retrievePaymentIntent';
import { Payment, PaymentIntent } from '../types/payment';

describe('paymentSlice', () => {
  const initialState: PaymentSchema = {
    payments: [],
    payment: undefined,
    clientSecret: undefined,
    paymentIntentId: undefined,
    loading: 'idle',
  };

  test('should return the initial state', () => {
    expect(paymentSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe.each([
    ['createPayment', createPayment],
    ['getAllPayments', getAllPayments],
    ['getPayment', getPayment],
    ['cancelPayment', cancelPayment],
    ['confirmPayment', confirmPayment],
    ['retrievePaymentIntent', retrievePaymentIntent],
  ])('%s', (actionName, action) => {
    test(`should handle ${actionName}.pending`, () => {
      const state = paymentSlice(initialState, {
        type: action.pending.type,
      });

      expect(state.loading).toBe('pending');
    });

    test(`should handle ${actionName}.rejected`, () => {
      const state = paymentSlice(initialState, {
        type: action.rejected.type,
      });

      expect(state.loading).toBe('failed');

      if (['createPayment', 'retrievePaymentIntent'].includes(actionName)) {
        expect(state.clientSecret).toBeUndefined();
        expect(state.paymentIntentId).toBeUndefined();
      }

      if (actionName === 'getPayment') {
        expect(state.payment).toBeUndefined();
        expect(state.paymentIntentId).toBeUndefined();
      }
    });
  });

  describe('createPayment', () => {
    test('should handle createPayment.fulfilled', () => {
      const mockPayload = {
        data: {
          clientSecret: 'pi_test_client_secret',
          paymentIntentId: 'pi_test_payment_intent_id',
        },
      };
      const action = {
        type: createPayment.fulfilled.type,
        payload: mockPayload,
      };
      const state = paymentSlice(initialState, action);

      expect(state.loading).toBe('succeeded');
      expect(state.clientSecret).toBe('pi_test_client_secret');
      expect(state.paymentIntentId).toBe('pi_test_payment_intent_id');
    });
  });

  describe('getAllPayments', () => {
    test('should handle getAllPayments.fulfilled', () => {
      const mockPayments: Payment[] = [
        {
          order: 'order_1',
          user: 'user_1',
          amount: 1000,
          status: 'paid',
          paymentIntentId: 'pi_1',
          createdAt: '2023-01-01T00:00:00Z',
        },
        {
          order: 'order_2',
          user: 'user_2',
          amount: 2000,
          status: 'pending',
          paymentIntentId: 'pi_2',
          createdAt: '2023-01-02T00:00:00Z',
        },
      ];
      const mockPayload = { data: mockPayments };
      const action = {
        type: getAllPayments.fulfilled.type,
        payload: mockPayload,
      };
      const state = paymentSlice(initialState, action);

      expect(state.loading).toBe('succeeded');
      expect(state.payments).toEqual(mockPayments);
    });
  });

  describe('getPayment', () => {
    test('should handle getPayment.fulfilled', () => {
      const mockPayment: Payment = {
        order: 'order_1',
        user: 'user_1',
        amount: 1000,
        status: 'paid',
        paymentIntentId: 'pi_1',
        createdAt: '2023-01-01T00:00:00Z',
      };
      const mockPayload = { data: mockPayment };
      const action = {
        type: getPayment.fulfilled.type,
        payload: mockPayload,
      };
      const state = paymentSlice(initialState, action);

      expect(state.loading).toBe('succeeded');
      expect(state.payment).toEqual(mockPayment);
      expect(state.paymentIntentId).toBe('pi_1');
    });
  });

  describe('cancelPayment', () => {
    test('should handle cancelPayment.fulfilled', () => {
      const action = { type: cancelPayment.fulfilled.type };
      const state = paymentSlice(initialState, action);

      expect(state.loading).toBe('succeeded');
    });
  });

  describe('confirmPayment', () => {
    test('should handle confirmPayment.fulfilled', () => {
      const action = { type: confirmPayment.fulfilled.type };
      const state = paymentSlice(initialState, action);

      expect(state.loading).toBe('succeeded');
    });
  });

  describe('retrievePaymentIntent', () => {
    test('should handle retrievePaymentIntent.fulfilled', () => {
      const mockPaymentIntent: PaymentIntent = {
        id: 'pi_test_id',
        status: 'requires_payment_method',
        amount: 1000,
        currency: 'usd',
        clientSecret: 'pi_test_client_secret',
        customer: 'cus_test',
        metadata: {
          orderId: 'order_1',
        },
      };
      const mockPayload = { data: mockPaymentIntent };
      const action = {
        type: retrievePaymentIntent.fulfilled.type,
        payload: mockPayload,
      };
      const state = paymentSlice(initialState, action);

      expect(state.loading).toBe('succeeded');
      expect(state.paymentIntentId).toBe('pi_test_id');
      expect(state.clientSecret).toBe('pi_test_client_secret');
    });
  });

  describe('state transitions', () => {
    test('should maintain state consistency across multiple actions', () => {
      let state = initialState;
      state = paymentSlice(state, { type: createPayment.pending.type });

      expect(state.loading).toBe('pending');

      const createPayload = {
        data: {
          clientSecret: 'pi_test_client_secret',
          paymentIntentId: 'pi_test_payment_intent_id',
        },
      };
      state = paymentSlice(state, {
        type: createPayment.fulfilled.type,
        payload: createPayload,
      });

      expect(state.loading).toBe('succeeded');
      expect(state.clientSecret).toBe('pi_test_client_secret');
      expect(state.paymentIntentId).toBe('pi_test_payment_intent_id');

      state = paymentSlice(state, { type: getPayment.pending.type });
      expect(state.loading).toBe('pending');

      const mockPayment: Payment = {
        order: 'order_1',
        user: 'user_1',
        amount: 1000,
        status: 'paid',
        paymentIntentId: 'pi_test_payment_intent_id',
        createdAt: '2023-01-01T00:00:00Z',
      };
      state = paymentSlice(state, {
        type: getPayment.fulfilled.type,
        payload: { data: mockPayment },
      });

      expect(state.loading).toBe('succeeded');
      expect(state.payment).toEqual(mockPayment);
      expect(state.paymentIntentId).toBe('pi_test_payment_intent_id');
    });

    test('should handle error states correctly', () => {
      let state = initialState;

      state = paymentSlice(state, { type: createPayment.pending.type });
      expect(state.loading).toBe('pending');

      state = paymentSlice(state, { type: createPayment.rejected.type });

      expect(state.loading).toBe('failed');
      expect(state.clientSecret).toBeUndefined();
      expect(state.paymentIntentId).toBeUndefined();

      state = paymentSlice(state, { type: getAllPayments.pending.type });
      expect(state.loading).toBe('pending');

      state = paymentSlice(state, { type: getAllPayments.rejected.type });
      expect(state.loading).toBe('failed');
    });
  });
});
