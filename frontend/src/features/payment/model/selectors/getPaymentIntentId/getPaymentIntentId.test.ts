import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { getPaymentIntentId } from './getPaymentIntentId';

describe('getPaymentIntentId', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      payment: {
        paymentIntentId: 'paymentIntentId',
      },
    };
    expect(getPaymentIntentId(state as StateSchema)).toEqual('paymentIntentId');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPaymentIntentId(state as StateSchema)).toEqual(undefined);
  });
});
