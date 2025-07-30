import { Cart } from '../../../Cart';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  cart?: Cart;
}

export interface UserSchema {
  user?: User;
  isLoading: boolean;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
