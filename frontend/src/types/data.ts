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

export interface IUpdate {
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

export interface IUpdatedUser {
  name?: string;
  email?: string;
  phone?: string;
}

export interface IUserState {
  user: {
    address: IAddress[] | [];
    cart: Object[] | [];
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
  imageCover: string;
  images: string[] | [];
  createdAt: string;
}

export interface IItemsState {
  item: IItem | null;
  items: IItem[] | [];
  isLoading: boolean;
}

//CART

export interface ICartItem {
  _id?: string;
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

export interface ICartState {
  cart: { items: ICartItem[]; total: number; totalQuantity: number } | null;
  isLoading: boolean;
}
