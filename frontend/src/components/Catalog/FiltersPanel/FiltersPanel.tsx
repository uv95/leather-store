import React from 'react';
import './filtersPanel.scss';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { removeFilter, setSort } from '../../../features/filters/filtersSlice';

const FiltersPanel = () => {
  const { filters, sort } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <div className="filtersPanel">
      {(sort === 'По умолчанию' ? filters : [...filters, sort]).map(
        (filter) => (
          <div className="filtersPanel__item" key={filter}>
            <div className="filtersPanel__item-cell">
              {filter}
              <span
                onClick={() => {
                  filter === 'Цена по возрастанию' ||
                  filter === 'Цена по убыванию'
                    ? dispatch(setSort('По умолчанию'))
                    : dispatch(removeFilter(filter));
                }}
              >
                &#9587;
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FiltersPanel;
