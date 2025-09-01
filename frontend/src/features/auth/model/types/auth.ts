import { User } from '../../../../entities/User';
import { ApiSuccessResponse } from '../../../../shared/types/apiResponse';

export interface SignupInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdatePasswordInput {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthSchema {
  isLoggedIn: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export type AuthApiResponseData = ApiSuccessResponse<User> & { token: string };
