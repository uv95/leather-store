import {
  AuthSchema,
  LoginInput,
  SignupInput,
  UpdatePasswordInput,
} from './model/types/auth';
import { signup } from './model/services/signup/signup';
import { login } from './model/services/login/login';
import { updatePassword } from './model/services/updatePassword/updatePassword';
import { getAuthLoading } from './model/selectors/getAuthLoading/getAuthLoading';
import { getIsLoggedIn } from './model/selectors/getIsLoggedIn/getIsLoggedIn';
import authReducer from './model/slice/authSlice';

export {
  type AuthSchema,
  type LoginInput,
  type SignupInput,
  type UpdatePasswordInput,
  signup,
  login,
  updatePassword,
  getAuthLoading,
  getIsLoggedIn,
  authReducer,
};
