import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk';
import { ApiSuccessResponse } from '../../../../../shared/types/apiResponse';
import { cancelPayment, CancelPaymentInput } from './cancelPayment';

describe('cancelPayment', () => {
  test('successful payment cancellation', async () => {
    const thunk = new TestAsyncThunk(cancelPayment);
    const testInput: CancelPaymentInput = {
      paymentIntentId: 'pi_test123',
    };
    const testOutput: ApiSuccessResponse<{ id: string; status: string }> = {
      status: 'success',
      data: {
        id: 'pi_test123',
        status: 'canceled',
      },
    };

    thunk.api.post.mockReturnValue(Promise.resolve({ data: testOutput }));

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalledWith('payment/pi_test123/cancel');
    expect(result.payload).toEqual(testOutput);
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('failed payment cancellation', async () => {
    const thunk = new TestAsyncThunk(cancelPayment);
    thunk.api.post.mockRejectedValue(new Error('Payment cancellation failed'));

    const testInput: CancelPaymentInput = {
      paymentIntentId: 'pi_test123',
    };

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalledWith('payment/pi_test123/cancel');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Payment cancellation failed');
  });
});
