import { AddressSchema } from '../../../../entities/Address';
import { ItemsSchema } from '../../../../entities/Item';

export interface StateSchema {
  items: ItemsSchema;
  address: AddressSchema;
}
