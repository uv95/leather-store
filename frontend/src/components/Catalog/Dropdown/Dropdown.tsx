import React from 'react';
import './dropdown.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addFilter,
  clearFilter,
  removeFilter,
  setSort,
} from '../../../features/filters/filtersSlice';

interface DropdownProps {
  open: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ open }) => {
  const dispatch = useAppDispatch();
  const { filters, sort } = useAppSelector((state) => state.filters);

  const productTypes: string[] = [
    'Кошельки и картхолдеры',
    'Обложки на паспорт',
    'Чехлы для очков',
  ];
  const sortingOptions: string[] = [
    'Цена по убыванию',
    'Цена по возрастанию',
    'По умолчанию',
  ];

  const handleFilter = (filter: string) => {
    filters.includes(filter)
      ? dispatch(removeFilter(filter))
      : dispatch(addFilter(filter));
  };
  return (
    <div className={`dropdown dropdown--${open ? 'open' : 'closed'}`}>
      <div className="dropdown__content">
        <div className="dropdown__content-left">
          <div className="dropdown__content-left__title">Тип</div>
          <div className="dropdown__content-left__options">
            <div
              onClick={() => dispatch(clearFilter())}
              className={`${
                !filters.length
                  ? 'dropdown__content-left__options--item-active'
                  : ''
              } dropdown__content-left__options--item`}
            >
              Все товары
            </div>
            {productTypes.map((option) => (
              <div
                key={option}
                onClick={() => handleFilter(option)}
                className={`${
                  filters.includes(option)
                    ? 'dropdown__content-left__options--item-active'
                    : ''
                } dropdown__content-left__options--item`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className="dropdown__content-right">
          <div className="dropdown__content-right__title">Сортировка</div>
          <div className="dropdown__content-right__options">
            {sortingOptions.map((option) => (
              <div
                key={option}
                className={`${
                  sort === option
                    ? 'dropdown__content-right__options--item-active'
                    : ''
                } dropdown__content-right__options--item`}
                onClick={() => dispatch(setSort(option))}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
