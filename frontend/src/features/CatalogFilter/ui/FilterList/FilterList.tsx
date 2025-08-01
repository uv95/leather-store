import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import FilterTag from '../../../../shared/ui/FilterTag/FilterTag';
import { getFilters } from '../../model/selectors/getFilters/getFilters';
import { getSortBy } from '../../model/selectors/getSortBy/getSortBy';
import { removeFilter, setSort } from '../../model/slice/filterSlice';
import { SortingOptions } from '../../model/types/filter';
import './filterList.scss';

const FilterList = () => {
  const dispatch = useAppDispatch();
  const filters = useSelector(getFilters);
  const sortBy = useSelector(getSortBy);

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
    <div className="filterList">
      {(sortBy === SortingOptions.DEFAULT ? filters : [...filters, sortBy]).map(
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

export default FilterList;
