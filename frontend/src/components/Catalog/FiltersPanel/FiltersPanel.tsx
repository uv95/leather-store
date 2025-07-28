import { useAppSelector, useAppDispatch } from '../../../hooks';
import { removeFilter, setSort } from '../../../features/filters/filtersSlice';
import { SortingOptions } from '../../../types/data';
import './filtersPanel.scss';
import FilterTag from '../../../shared/ui/FilterTag/FilterTag';
import { useCallback } from 'react';

const FiltersPanel = () => {
  const { filters, sort } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const onRemoveFilter = useCallback(
    (filter: string) => {
      filter === SortingOptions.PRICE_ASCENDING ||
      filter === SortingOptions.PRICE_DESCENDING
        ? dispatch(setSort(SortingOptions.DEFAULT))
        : dispatch(removeFilter(filter));
    },
    [dispatch]
  );

  return (
    <div className="filtersPanel">
      {(sort === SortingOptions.DEFAULT ? filters : [...filters, sort]).map(
        (filter) => (
          <FilterTag
            key={filter}
            filter={filter}
            onClick={() => onRemoveFilter(filter)}
          />
        )
      )}
    </div>
  );
};

export default FiltersPanel;
