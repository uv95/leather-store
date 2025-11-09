import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { getPaymentLoading } from './getPaymentLoading';

describe('getPaymentLoading', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      payment: {
        loading: 'pending',
      },
    };
    expect(getPaymentLoading(state as StateSchema)).toEqual('pending');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPaymentLoading(state as StateSchema)).toEqual(undefined);
  });
});
