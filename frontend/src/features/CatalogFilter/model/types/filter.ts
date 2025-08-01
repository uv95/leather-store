export interface FilterSchema {
  filters: string[];
  sortBy: SortingOptions;
}

export enum SortingOptions {
  PRICE_DESCENDING = 'Price descending',
  PRICE_ASCENDING = 'Price ascending',
  DEFAULT = 'Default',
}
