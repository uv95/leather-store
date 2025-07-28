import { Color, IAddress, IUser } from '../../../../types/data';
import { ItemType } from '../../../Item/model/types/item';

export interface IOrder {
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
  user: IUser;
  total: number;
  address: IAddress;
  status: OrderStatus;
  createdAt: Date;
}

export enum OrderStatus {
  AWAITING_PAYMENT = 'Awaiting payment',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}
