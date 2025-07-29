export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PasswordUpdateData {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthSchema {
  isLoggedIn: boolean;
  isLoading: boolean;
}
