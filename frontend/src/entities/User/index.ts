import { UserSchema, User, Role } from './model/types/user';
import { getUser } from './model/services/getUser/getUser';
import { deleteUser } from './model/services/deleteUser/deleteUser';
import { updateUser } from './model/services/updateUser/updateUser';
import { getUser as getUserSelector } from './model/selectors/getUser/getUser';
import { getUserId } from './model/selectors/getUserId/getUserId';
import { getUserLoading } from './model/selectors/getUserLoading/getUserLoading';
import userReducer from './model/slice/userSlice';
import { getUserRole } from './model/selectors/getUserRole/getUserRole';
import { logout, setUser } from './model/slice/userSlice';

export {
  type UserSchema,
  type User,
  Role,
  getUser,
  updateUser,
  deleteUser,
  getUserRole,
  getUserSelector,
  getUserId,
  getUserLoading,
  userReducer,
  logout,
  setUser,
};
