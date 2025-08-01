import CatalogFilterDropdown from './ui/CatalogFilterDropdown/CatalogFilterDropdown';
import FilterList from './ui/FilterList/FilterList';
import filterReducer from './model/slice/filterSlice';
import {
  addFilter,
  removeFilter,
  clearFilter,
} from './model/slice/filterSlice';
import { FilterSchema, SortingOptions } from './model/types/filter';
import { getFilters } from './model/selectors/getFilters/getFilters';
import { getSortBy } from './model/selectors/getSortBy/getSortBy';

export {
  CatalogFilterDropdown,
  FilterList,
  filterReducer,
  addFilter,
  removeFilter,
  clearFilter,
  type FilterSchema,
  SortingOptions,
  getFilters,
  getSortBy,
};
