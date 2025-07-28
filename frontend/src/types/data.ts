//ADDRESS

import { Address } from '../entities/Address';
import { Item, ItemType } from '../entities/Item/model/types/item';
import { OrderStatus } from '../entities/Order/model/types/order';

//AUTH

export interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  role?: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdatedAuth {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

//USER

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
}

export interface IUserState {
  user: {
    _id?: string;
    address: Address[] | [];
    cart: ICart;
    email: string;
    name: string;
    phone: string;
    role: Role;
  } | null;
  users: Object[] | [];
  isLoading: boolean;
}

//ITEM

interface IImage {
  url: string;
  public_id: string;
}

//CART

export interface ICartItem {
  _id?: string;
  total: number;
  item: {
    name: string;
    imageCover: IImage;
    price: number;
    type: ItemType;
  };
  quantity: number;
  colors: {
    leatherColor: Color;
    threadsColor: Color;
  };
  leather: string;
}

export interface ICart {
  items: ICartItem[];
  total: number;
  totalQuantity: number;
}
export interface IUpdatedQuantity {
  cartItemId: string;
  quantity: IQuantity;
}
export interface IQuantity {
  quantity: number;
}

export interface ICartState {
  cart: ICart | null;
  isLoading: boolean;
}

//FILTER

export interface IFilterState {
  filters: string[];
  sort: string;
}

export enum Color {
  BLACK = 'black',
  BROWN = 'brown',
  BLUE = 'blue',
  GINGER = 'ginger',
  RED = 'red',
  BURGUNDY = 'burgundy',
  GREEN = 'green',
  GREY = 'grey',
  KHAKI = 'khaki',
}

export const HexColor = {
  [Color.BLACK]: '#000000',
  [Color.BROWN]: '#55391a',
  [Color.BLUE]: '#0846aa',
  [Color.GINGER]: '#aa6908',
  [Color.RED]: '#cb1212',
  [Color.BURGUNDY]: '#801030',
  [Color.GREEN]: '#1e8b0d',
  [Color.GREY]: '#909090',
  [Color.KHAKI]: '#474c21',
};

export enum LeatherType {
  CRAZY_HORSE = 'Crazy Horse',
  NAPPA = 'Nappa',
  PULL_UP = 'Pull Up',
}

export enum ItemPart {
  LEATHER = 'leather',
  THREAD = 'thread',
}

export enum SortingOptions {
  PRICE_DESCENDING = 'Price descending',
  PRICE_ASCENDING = 'Price ascending',
  DEFAULT = 'Default',
}

export interface MonthleRevenue {
  totalRevenue: number;
  _id: {
    year: number;
    month: number;
  };
}

export interface OrdersByCategory {
  _id: ItemType;
  totalQuantity: number;
  totalRevenue: number;
}
