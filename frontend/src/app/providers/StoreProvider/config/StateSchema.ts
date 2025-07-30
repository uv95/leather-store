import { AddressSchema } from '../../../../entities/Address';
import { CartSchema } from '../../../../entities/Cart';
import { ItemsSchema } from '../../../../entities/Item';
import { OrderSchema } from '../../../../entities/Order';
import { UserSchema } from '../../../../entities/User';
import { AnalyticsSchema } from '../../../../features/analytics';
import { AuthSchema } from '../../../../features/auth';

export interface StateSchema {
  items: ItemsSchema;
  address: AddressSchema;
  orders: OrderSchema;
  analytics: AnalyticsSchema;
  user: UserSchema;
  auth: AuthSchema;
  cart: CartSchema;
}
