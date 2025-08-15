import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';
import { Role } from '../../types/user';

export const getUserRole = (state: StateSchema) =>
  state.user.user?.role || Role.USER;
