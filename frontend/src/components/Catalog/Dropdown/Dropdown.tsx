import React from 'react';
import './dropdown.scss';
import Button from '../../UI/Button/Button';

interface DropdownProps {
  open: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ open }) => {
  const productTypes: string[] = [
    'Все товары',
    'Кошельки и картхолдеры',
    'Обложки на паспорт',
    'Чехлы для очков',
  ];
  const sortingOptions: string[] = [
    'Цена по убыванию',
    'Цена по возрастанию',
    'По умолчанию',
  ];
  return (
    <div className={`dropdown dropdown--${open ? 'open' : 'closed'}`}>
      <div className="dropdown__content">
        <div className="dropdown__content-left">
          <div className="dropdown__content-left__title">Тип</div>
          <div className="dropdown__content-left__options">
            {productTypes.map((option) => (
              <div
                key={option}
                className="dropdown__content-left__options--item"
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
                className="dropdown__content-right__options--item"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <Button text="Применить" color="gray" />
      </div>
    </div>
  );
};

export default Dropdown;
