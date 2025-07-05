import React from 'react';
import './dropdown.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addFilter,
  clearFilter,
  removeFilter,
  setSort,
} from '../../../features/filters/filtersSlice';
import { ItemType, SortingOptions } from '../../../types/data';
import DropdownSection from './DropdownSection';

interface DropdownProps {
  open: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ open }) => {
  const dispatch = useAppDispatch();
  const { filters, sort } = useAppSelector((state) => state.filters);

  const handleFilter = (filter: string) => {
    filters.includes(filter)
      ? dispatch(removeFilter(filter))
      : dispatch(addFilter(filter));
  };
  return (
    <div className={`dropdown dropdown--${open ? 'open' : 'closed'}`}>
      <div className="dropdown__content">
        <DropdownSection title="Type">
          <div
            onClick={() => dispatch(clearFilter())}
            className={`dropdown__content-section-options--item${
              !filters.length ? '-active' : ''
            }`}
          >
            All items
          </div>
          {Object.values(ItemType).map((option) => (
            <div
              key={option}
              onClick={() => handleFilter(option)}
              className={`dropdown__content-section-options--item${
                filters.includes(option) ? '-active' : ''
              }`}
            >
              {option}
            </div>
          ))}
        </DropdownSection>
        <DropdownSection title="Sort">
          {Object.values(SortingOptions).map((option) => (
            <div
              key={option}
              className={`dropdown__content-section-options--item${
                sort === option ? '-active' : ''
              }`}
              onClick={() => dispatch(setSort(option))}
            >
              {option}
            </div>
          ))}
        </DropdownSection>
      </div>
    </div>
  );
};

export default Dropdown;
