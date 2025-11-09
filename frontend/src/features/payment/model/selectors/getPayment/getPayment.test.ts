import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { getPayment } from './getPayment';

describe('getPayment', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      payment: {
        payment: { amount: 100 },
      },
    };
    expect(getPayment(state as StateSchema)).toEqual({ amount: 100 });
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPayment(state as StateSchema)).toEqual(undefined);
  });
});
