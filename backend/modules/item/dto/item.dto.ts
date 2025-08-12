import { OptionalType } from 'utils/types';
import { ItemType } from '../model/item.model';

export interface CreateItemDto {
  name: string;
  description: string;
  type: ItemType;
  price: number;
  imageCover: {
    url: string;
    public_id: string;
  };
  images?: {
    url: string;
    public_id: string;
  }[];
}

export type UpdateItemDto = OptionalType<CreateItemDto>;
