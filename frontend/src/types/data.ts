import { ItemType } from '../entities/Item/model/types/item';

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
