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
    role: string;
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
    leatherColor: string;
    threadsColor: string;
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
  user: string;
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

//ORDER

export interface IOrder {
  _id?: string;
  items: ICartItem[];
  user: IUser;
  total: number;
  address: IAddress;
  status: string;
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
