import { OrderStatus } from '../model/order.model';

export interface CreateOrderDto {
  cartId: string;
  address: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  address?: string;
}
