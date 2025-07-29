import { ICart } from '../../../../types/data';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  cart?: ICart;
}

export interface UserSchema {
  user?: User;
  isLoading: boolean;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
