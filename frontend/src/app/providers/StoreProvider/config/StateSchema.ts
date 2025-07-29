import { AddressSchema } from '../../../../entities/Address';
import { ItemsSchema } from '../../../../entities/Item';
import { OrderSchema } from '../../../../entities/Order/model/types/order';
import { UserSchema } from '../../../../entities/User/model/types/user';
import { AnalyticsSchema } from '../../../../features/analytics';

export interface StateSchema {
  items: ItemsSchema;
  address: AddressSchema;
  orders: OrderSchema;
  analytics: AnalyticsSchema;
  user: UserSchema;
}
