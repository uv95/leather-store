import React, { useRef, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './addItem.scss';
import Button from '../Button/Button';

interface AddItemProps {
  setOpenAddItem: (arg: boolean) => void;
}

const AddItem: React.FC<AddItemProps> = ({ setOpenAddItem }) => {
  return ReactDOM.createPortal(
    <div className="background" onClick={() => setOpenAddItem(false)}>
      <div className="add-item" onClick={(e) => e.stopPropagation()}>
        <h1 className="add-item-title">Добавить товар</h1>
        <div className="add-item__container">
          <div className="add-item__container__field">
            <label htmlFor="type" className="add-item__container__field-label">
              Тип товара
            </label>
            <select
              name="type"
              id="type"
              className="add-item__container__field-select"
            >
              <option value="wallet">Кошельки и картхолдеры</option>
              <option value="passportCover">Обложки на паспорт</option>
              <option value="glassesCase">Чехлы для очков</option>
            </select>
          </div>
          <div className="add-item__container__field">
            <label htmlFor="title" className="add-item__container__field-label">
              Название
            </label>
            <input
              type="text"
              id="title"
              required
              className="add-item__container__field-input"
              placeholder="Crazy Horse Кошелек"
            />
          </div>
          <div className="add-item__container__field">
            <label htmlFor="price" className="add-item__container__field-label">
              Цена
            </label>
            <input
              type="number"
              id="price"
              required
              className="add-item__container__field-input"
              placeholder="1000 руб."
            />
          </div>
          <div className="add-item__container__field">
            <label
              htmlFor="description"
              className="add-item__container__field-label"
            >
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              className="add-item__container__field-input"
              placeholder="Введите описание товара"
            />
          </div>
          <div className="add-item__container__field">
            <label htmlFor="file" className="add-item__container__field-label">
              Изображение
            </label>
            <input
              type="file"
              id="file"
              multiple
              className="add-item__container__field-input"
              accept="image/jpeg, image/jpg"
            />
          </div>
          <div className="add-item__container__btn">
            <Button onClick={() => {}} text="Добавить" color="grey" />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default AddItem;
