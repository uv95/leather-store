import { useSelector } from 'react-redux';
import { ItemType } from '../../../../entities/Item/model/types/item';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import Dropdown from '../../../../shared/ui/Dropdown/Dropdown';
import { getFilters } from '../../model/selectors/getFilters/getFilters';
import { getSortBy } from '../../model/selectors/getSortBy/getSortBy';
import {
  addFilter,
  clearFilter,
  removeFilter,
  setSort,
} from '../../model/slice/filterSlice';
import FilterDropdownButton from '../FilterDropdownButton/FilterDropdownButton';
import FilterDropdownSection from '../FilterDropdownSection/FilterDropdownSection';
import { SortingOptions } from '../../model/types/filter';

const CatalogFilterDropdown = () => {
  const dispatch = useAppDispatch();
  const filters = useSelector(getFilters);
  const sortBy = useSelector(getSortBy);

  const handleFilter = (filter: string) => {
    filters.includes(filter)
      ? dispatch(removeFilter(filter))
      : dispatch(addFilter(filter));
  };

  return (
    <Dropdown buttonText="Filter and sort">
      <FilterDropdownSection title="Type">
        <FilterDropdownButton
          onClick={() => dispatch(clearFilter())}
          isSelected={!filters.length}
          text="All items"
        />
        {Object.values(ItemType).map((option) => (
          <FilterDropdownButton
            key={option}
            onClick={() => handleFilter(option)}
            isSelected={filters.includes(option)}
            text={option}
          />
        ))}
      </FilterDropdownSection>
      <FilterDropdownSection title="Sort">
        {Object.values(SortingOptions).map((option) => (
          <FilterDropdownButton
            key={option}
            onClick={() => dispatch(setSort(option))}
            isSelected={sortBy === option}
            text={option}
          />
        ))}
      </FilterDropdownSection>
    </Dropdown>
  );
};

export default CatalogFilterDropdown;
