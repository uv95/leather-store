import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getFilteredItems = createSelector(
  (state: StateSchema) => state.items.items,
  (state: StateSchema) => state.filters.filters,
  (items, filters) => {
    if (!filters.length) {
      return items;
    }

    return items.filter((item) => {
      const itemsFilters = ([] as string[]).concat(item.type);
      return filters.some((filter: string) => itemsFilters.includes(filter));
    });
  }
);
