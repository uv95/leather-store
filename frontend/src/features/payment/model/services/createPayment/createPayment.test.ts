import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk';
import { ApiSuccessResponse } from '../../../../../shared/types/apiResponse';
import {
  createPayment,
  CreatePaymentInput,
  CreatePaymentResponseData,
} from './createPayment';

describe('createPayment', () => {
  test('successful payment creation', async () => {
    const thunk = new TestAsyncThunk(createPayment);
    const testInput: CreatePaymentInput = {
      orderId: '123',
      amount: 100,
    };
    const testOutput: ApiSuccessResponse<CreatePaymentResponseData> = {
      status: 'success',
      data: {
        clientSecret: 'clientSecret',
        paymentIntentId: 'paymentIntentId',
      },
    };

    thunk.api.post.mockReturnValue(Promise.resolve({ data: testOutput }));

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.payload).toEqual(testOutput);
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('failed payment creation', async () => {
    const thunk = new TestAsyncThunk(createPayment);
    thunk.api.post.mockRejectedValue(new Error('Payment failed'));

    const testInput: CreatePaymentInput = {
      orderId: '123',
      amount: 100,
    };

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Payment failed');
  });
});
