import {
  Item,
  ItemType,
  ItemsSchema,
  Image,
  Color,
  HexColor,
  LeatherType,
} from './model/types/item';
import itemsReducer from './model/slice/itemsSlice';
import { getFilteredItems } from './model/selectors/getFilteredItems/getFilteredItems';
import { getItem } from './model/selectors/getItem/getItem';
import { getItemsIsLoading } from './model/selectors/getItemsIsLoading/getItemsIsLoading';
import { addItem } from './model/services/addItem/addItem';
import { deleteItem } from './model/services/deleteItem/deleteItem';
import { getAllItems } from './model/services/getAllItems/getAllItems';
import { getItemBySlug } from './model/services/getItemBySlug/getItemBySlug';
import { updateItem } from './model/services/updateItem/updateItem';
import ItemImage from './ui/ItemImage/ItemImage';
import ItemInfo from './ui/ItemInfo/ItemInfo';
import ItemInfoSkeleton from './ui/ItemInfoSkeleton/ItemInfoSkeleton';

export {
  type Item,
  ItemType,
  type ItemsSchema,
  type Image,
  Color,
  HexColor,
  LeatherType,
  itemsReducer,
  getFilteredItems,
  getItem,
  getItemsIsLoading,
  addItem,
  deleteItem,
  getAllItems,
  getItemBySlug,
  updateItem,
  ItemImage,
  ItemInfo,
  ItemInfoSkeleton,
};
