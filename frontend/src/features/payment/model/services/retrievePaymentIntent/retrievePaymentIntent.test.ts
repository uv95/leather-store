import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk';
import { ApiSuccessResponse } from '../../../../../shared/types/apiResponse';
import { retrievePaymentIntent } from './retrievePaymentIntent';
import { PaymentIntent } from '../../types/payment';

describe('retrievePaymentIntent', () => {
  test('successful payment intent retrieval', async () => {
    const thunk = new TestAsyncThunk(retrievePaymentIntent);
    const testInput = {
      paymentIntentId: 'pi_test123',
    };
    const testOutput: ApiSuccessResponse<PaymentIntent> = {
      status: 'success',
      data: {
        id: 'pi_test123',
        status: 'succeeded',
        amount: 100,
        currency: 'usd',
        clientSecret: 'pi_test123_secret',
        customer: 'cus_test123',
        metadata: {
          orderId: 'order123',
        },
      },
    };

    thunk.api.get.mockReturnValue(Promise.resolve({ data: testOutput }));

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalledWith('payment/pi_test123');
    expect(result.payload).toEqual(testOutput);
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('failed payment intent retrieval', async () => {
    const thunk = new TestAsyncThunk(retrievePaymentIntent);
    thunk.api.get.mockRejectedValue(new Error('Payment intent not found'));

    const testInput = {
      paymentIntentId: 'pi_test123',
    };

    const result = await thunk.callThunk(testInput);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalledWith('payment/pi_test123');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Payment intent not found');
  });
});
