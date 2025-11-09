import { AxiosInstance } from 'axios';
import { AddressSchema } from '../../../../entities/Address';
import { CartSchema } from '../../../../entities/Cart';
import { ItemsSchema } from '../../../../entities/Item';
import { OrderSchema } from '../../../../entities/Order';
import { UserSchema } from '../../../../entities/User';
import { AnalyticsSchema } from '../../../../features/analytics';
import { AuthSchema } from '../../../../features/auth';
import { FilterSchema } from '../../../../features/CatalogFilter';
import { NavigateOptions, To } from 'react-router-dom';
import { PaymentSchema } from '../../../../features/payment';

export interface StateSchema {
  items: ItemsSchema;
  address: AddressSchema;
  orders: OrderSchema;
  analytics: AnalyticsSchema;
  user: UserSchema;
  auth: AuthSchema;
  cart: CartSchema;
  filters: FilterSchema;
  payment: PaymentSchema;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
}
