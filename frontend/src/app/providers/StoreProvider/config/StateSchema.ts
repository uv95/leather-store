import { AddressSchema } from '../../../../entities/Address';
import { ItemsSchema } from '../../../../entities/Item';
import { OrderSchema } from '../../../../entities/Order/model/types/order';

export interface StateSchema {
  items: ItemsSchema;
  address: AddressSchema;
  orders: OrderSchema;
}
