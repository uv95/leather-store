import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk';
import { ApiSuccessResponse } from '../../../../../shared/types/apiResponse';
import { confirmPayment, ConfirmPaymentInput } from './confirmPayment';

describe('confirmPayment', () => {
  test('successful payment confirmation', async () => {
    const thunk = new TestAsyncThunk(confirmPayment);
    const testInput: ConfirmPaymentInput = {
      paymentIntentId: 'pi_test123',
    };
    const testOutput: ApiSuccessResponse<{ id: string; status: string }> = {
      status: 'success',
      data: {
        id: 'pi_test123',
        status: 'succeeded',
      },
    };

    thunk.api.post.mockReturnValue(Promise.resolve({ data: testOutput }));

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalledWith('payment/pi_test123/confirm');
    expect(result.payload).toEqual(testOutput);
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('failed payment confirmation', async () => {
    const thunk = new TestAsyncThunk(confirmPayment);
    thunk.api.post.mockRejectedValue(new Error('Payment confirmation failed'));

    const testInput: ConfirmPaymentInput = {
      paymentIntentId: 'pi_test123',
    };

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalledWith('payment/pi_test123/confirm');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Payment confirmation failed');
  });
});
