import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk';
import { ApiSuccessResponse } from '../../../../../shared/types/apiResponse';
import { getPayment, GetPaymentInput } from './getPayment';
import { Payment } from '../../types/payment';

describe('getPayment', () => {
  test('successful payment retrieval', async () => {
    const thunk = new TestAsyncThunk(getPayment);
    const testInput: GetPaymentInput = {
      orderId: 'order123',
    };
    const testOutput: ApiSuccessResponse<Payment> = {
      status: 'success',
      data: {
        order: 'order123',
        user: 'user123',
        amount: 100,
        status: 'paid',
        paymentIntentId: 'pi_test123',
        createdAt: '2023-01-01T00:00:00Z',
      },
    };

    thunk.api.get.mockReturnValue(Promise.resolve({ data: testOutput }));

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalledWith('order/order123/payment');
    expect(result.payload).toEqual(testOutput);
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('failed payment retrieval', async () => {
    const thunk = new TestAsyncThunk(getPayment);
    thunk.api.get.mockRejectedValue(new Error('Payment not found'));

    const testInput: GetPaymentInput = {
      orderId: 'order123',
    };

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalledWith('order/order123/payment');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Payment not found');
  });
});
