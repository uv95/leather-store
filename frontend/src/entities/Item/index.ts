import {
  Item,
  ItemType,
  ItemsSchema,
  Image,
  Color,
  HexColor,
  LeatherType,
  ItemDto,
} from './model/types/item';
import itemsReducer from './model/slice/itemsSlice';
import { getFilteredItems } from './model/selectors/getFilteredItems/getFilteredItems';
import { getItem } from './model/selectors/getItem/getItem';
import { getItemsLoading } from './model/selectors/getItemsLoading/getItemsLoading';
import { createItem } from './model/services/createItem/createItem';
import { deleteItem } from './model/services/deleteItem/deleteItem';
import { getItems } from './model/services/getItems/getItems';
import { getItemBySlug } from './model/services/getItemBySlug/getItemBySlug';
import { getItemById } from './model/services/getItemById/getItemById';
import { updateItem } from './model/services/updateItem/updateItem';
import ItemImage from './ui/ItemImage/ItemImage';
import ItemInfo from './ui/ItemInfo/ItemInfo';
import ItemInfoSkeleton from './ui/ItemInfoSkeleton/ItemInfoSkeleton';

export {
  type Item,
  ItemType,
  type ItemsSchema,
  type Image,
  type ItemDto,
  Color,
  HexColor,
  LeatherType,
  itemsReducer,
  getFilteredItems,
  getItem,
  getItemsLoading,
  createItem,
  deleteItem,
  getItems,
  getItemBySlug,
  getItemById,
  updateItem,
  ItemImage,
  ItemInfo,
  ItemInfoSkeleton,
};
