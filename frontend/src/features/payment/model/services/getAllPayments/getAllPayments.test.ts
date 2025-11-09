import { TestAsyncThunk } from '../../../../../shared/lib/tests/TestAsyncThunk';
import { ApiSuccessResponse } from '../../../../../shared/types/apiResponse';
import { getAllPayments } from './getAllPayments';
import { Payment } from '../../types/payment';

describe('getAllPayments', () => {
  test('successful payments retrieval', async () => {
    const thunk = new TestAsyncThunk(getAllPayments);
    const testOutput: ApiSuccessResponse<Payment[]> = {
      status: 'success',
      data: [
        {
          order: 'order123',
          user: 'user123',
          amount: 100,
          status: 'paid',
          paymentIntentId: 'pi_test123',
          createdAt: '2023-01-01T00:00:00Z',
        },
        {
          order: 'order456',
          user: 'user456',
          amount: 200,
          status: 'pending',
          paymentIntentId: 'pi_test456',
          createdAt: '2023-01-02T00:00:00Z',
        },
      ],
    };

    thunk.api.get.mockReturnValue(Promise.resolve({ data: testOutput }));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalledWith('payment');
    expect(result.payload).toEqual(testOutput);
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('failed payments retrieval', async () => {
    const thunk = new TestAsyncThunk(getAllPayments);
    thunk.api.get.mockRejectedValue(new Error('Failed to retrieve payments'));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalledWith('payment');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Failed to retrieve payments');
  });
});
