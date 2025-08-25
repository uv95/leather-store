export interface SignupDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ResetPasswordDto {
  password: string;
  passwordConfirm: string;
}

export interface UpdatePasswordDto {
  password: string;
  passwordConfirm: string;
  passwordCurrent: string;
}
