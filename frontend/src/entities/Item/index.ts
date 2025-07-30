import { Item, ItemType, ItemsSchema, Image } from './model/types/item';
import itemsReducer from './model/slice/itemsSlice';
import { getFilteredItems } from './model/selectors/getFilteredItems/getFilteredItems';
import { getItem } from './model/selectors/getItem/getItem';
import { getItemsIsLoading } from './model/selectors/getItemsIsLoading/getItemsIsLoading';
import { addItem } from './model/services/addItem/addItem';
import { deleteItem } from './model/services/deleteItem/deleteItem';
import { getAllItems } from './model/services/getAllItems/getAllItems';
import { getItemBySlug } from './model/services/getItemBySlug/getItemBySlug';
import { updateItem } from './model/services/updateItem/updateItem';

export {
  type Item,
  ItemType,
  type ItemsSchema,
  type Image,
  itemsReducer,
  getFilteredItems,
  getItem,
  getItemsIsLoading,
  addItem,
  deleteItem,
  getAllItems,
  getItemBySlug,
  updateItem,
};
