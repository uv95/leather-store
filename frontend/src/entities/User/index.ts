import { UserSchema, User, Role } from './model/types/user';
import { getUser } from './model/services/getUser/getUser';
import { updateUser } from './model/services/updateUser/updateUser';
import { getUser as getUserSelector } from './model/selectors/getUser/getUser';
import { getUserIsLoading } from './model/selectors/getUserIsLoading/getUserIsLoading';
import userReducer from './model/slice/userSlice';

export {
  type UserSchema,
  type User,
  Role,
  getUser,
  updateUser,
  getUserSelector,
  getUserIsLoading,
  userReducer,
};
