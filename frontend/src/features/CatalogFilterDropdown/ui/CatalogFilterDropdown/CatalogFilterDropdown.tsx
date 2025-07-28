import { ItemType } from '../../../../entities/Item/model/types/item';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import Dropdown from '../../../../shared/ui/Dropdown/Dropdown';
import { SortingOptions } from '../../../../types/data';
import {
  addFilter,
  clearFilter,
  removeFilter,
  setSort,
} from '../../../filters/filtersSlice';
import FilterDropdownButton from '../FilterDropdownButton/FilterDropdownButton';
import FilterDropdownSection from '../FilterDropdownSection/FilterDropdownSection';

const CatalogFilterDropdown = () => {
  const dispatch = useAppDispatch();
  const { filters, sort } = useAppSelector((state) => state.filters);

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
            isSelected={sort === option}
            text={option}
          />
        ))}
      </FilterDropdownSection>
    </Dropdown>
  );
};

export default CatalogFilterDropdown;
