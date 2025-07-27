import {
  Color,
  IAddress,
  ItemType,
  IUser,
  OrderStatus,
} from '../../../../types/data';

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
