import { Address } from '../../../Address';
import { ItemColors } from '../../../Cart';
import { Image, LeatherType } from '../../../Item';
import { User } from '../../../User';

export interface Order<UserType> {
  _id: string;
  user: UserType;
  address: Address;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  orderItems: OrderItem[];
}

export enum OrderStatus {
  AWAITING_PAYMENT = 'Awaiting payment',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}

export interface OrderSchema {
  orders: AdminOrder[];
  currentOrderId?: string;
  order?: UserOrder;
  userOrders: UserOrder[];
  userActiveOrderCount: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export type AdminOrder = Order<Omit<User, '_id' | 'role'>>;
export type UserOrder = Order<string>;

export interface OrderItem {
  _id: string;
  leatherType: LeatherType;
  quantity: number;
  price: number;
  order: string;
  item: {
    name: string;
    imageCover: Image;
  };
  colors: ItemColors;
}
