import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { getAllPayments } from './getAllPayments';

describe('getAllPayments', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      payment: {
        payments: [{ amount: 100 }],
      },
    };
    expect(getAllPayments(state as StateSchema)).toEqual([{ amount: 100 }]);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAllPayments(state as StateSchema)).toEqual(undefined);
  });
});
