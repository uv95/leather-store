import { Color, LeatherType } from '../../../utils/types';

export interface CreateCartItemDto {
  leatherType: LeatherType;
  quantity: number;
  price: number;
  item: string;
  colors: {
    leather: Color;
    thread: Color;
  };
}

export interface ChangeQuantityDto {
  quantity: number;
}

export interface ClearCartDto {
  cartId: string;
}

export type MergeCartItemsDto = CreateCartItemDto[];
