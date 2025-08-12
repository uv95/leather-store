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

type OptionalType<T> = {
  [K in keyof T]?: T[K];
};

export type UpdateItemDto = OptionalType<CreateItemDto>;
