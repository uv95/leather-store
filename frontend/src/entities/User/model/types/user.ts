export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface UserSchema {
  user?: User;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
