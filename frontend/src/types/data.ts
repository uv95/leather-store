//ADDRESS

export interface IAddress {
  _id?: string;
  city: string;
  address: string;
  zipcode: string;
}

export interface IAddressState {
  address: IAddress | null;
  addresses: IAddress[] | [];
  isLoading: boolean;
}

export interface IUpdatedAddress {
  addressId: string;
  updatedAddress: Partial<IAddress>;
}

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
    address: IAddress[] | [];
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

export interface IItem {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  price: string;
  imageCover: IImage;
  images: IImage[] | [];
  createdAt: string;
}

interface IImage {
  url: string;
  public_id: string;
}

export interface IItemsState {
  item: IItem | null;
  items: IItem[] | [];
  isLoading: boolean;
}

export interface IUpdatedItem {
  itemId: string;
  updatedItem: Partial<IItem>;
}

//CART

export interface ICartItem {
  _id?: string;
  total?: number;
  itemId: string;
  name: string;
  quantity: number;
  colors: {
    leatherColor: Color;
    threadsColor: Color;
  };
  leather: string;
  imageCover: string;
  images: string[];
  price: number;
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
  cart: ICart;
  isLoading: boolean;
}

//ORDER

export interface IOrder {
  _id?: string;
  items: ICartItem[];
  user: IUser;
  total: number;
  address: IAddress;
  status: OrderStatus;
  createdAt?: Date;
}

export interface IOrderState {
  order: IOrder | null;
  orders: IOrder[] | [];
  myOrders: IOrder[] | [];
  isLoading: boolean;
  status: 'idle' | 'rejected' | 'success' | 'pending';
}

export interface IUpdatedOrder {
  orderId: string;
  updatedOrder: Partial<IOrder>;
}

//FILTER

export interface IFilterState {
  filters: string[];
  sort: string;
}

export enum ItemType {
  WALLETS = 'Wallets and cardholders',
  EYEGLASS_CASES = 'Eyeglass cases',
  PASSPORT_COVERS = 'Passport covers',
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

export enum OrderStatus {
  AWAITING_PAYMENT = 'Awaiting payment',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}
