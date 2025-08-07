import { Address } from '../../../Address';
import { Color, ItemType } from '../../../Item';
import { User } from '../../../User';

export interface Order {
  _id?: string;
  items: {
    name: string;
    colors: { leatherColor: Color; threadsColor: Color };
    quantity: number;
    total: number;
    leather: string;
    imageCover: string;
    price: number;
    type: ItemType;
  }[];
  user: User;
  total: number;
  address: Address;
  status: OrderStatus;
  createdAt: Date;
}

export enum OrderStatus {
  AWAITING_PAYMENT = 'Awaiting payment',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}

export interface OrderSchema {
  order?: Order;
  orders: Order[];
  myOrders: Order[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
