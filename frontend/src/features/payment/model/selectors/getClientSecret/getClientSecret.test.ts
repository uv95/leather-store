import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { getClientSecret } from './getClientSecret';

describe('getClientSecret', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      payment: {
        clientSecret: 'clientSecret',
      },
    };
    expect(getClientSecret(state as StateSchema)).toEqual('clientSecret');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getClientSecret(state as StateSchema)).toEqual(undefined);
  });
});
