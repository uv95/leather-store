import {
  AuthSchema,
  LoginData,
  RegisterData,
  PasswordUpdateData,
} from './model/types/auth';
import { register } from './model/services/register/register';
import { login } from './model/services/login/login';
import { updatePassword } from './model/services/updatePassword/updatePassword';
import { getAuthIsLoading } from './model/selectors/getUserIsLoading/getAuthIsLoading';
import { getIsLoggedIn } from './model/selectors/getIsLoggedIn/getIsLoggedIn';
import authReducer from './model/slice/authSlice';

export {
  type AuthSchema,
  type LoginData,
  type RegisterData,
  type PasswordUpdateData,
  register,
  login,
  updatePassword,
  getAuthIsLoading,
  getIsLoggedIn,
  authReducer,
};
