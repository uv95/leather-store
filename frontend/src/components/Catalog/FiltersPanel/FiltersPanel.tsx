import React from 'react';
import './filtersPanel.scss';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { removeFilter } from '../../../features/filters/filtersSlice';

type FiltersPanelProps = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

const FiltersPanel = ({ sort, setSort }: FiltersPanelProps) => {
  const filters = useAppSelector((state) => state.filters);
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
                    ? setSort('По умолчанию')
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
