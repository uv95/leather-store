import React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../Button/Button';
import './addType.scss';

interface AddTypeProps {
  setOpenAddType: (arg: boolean) => void;
}

const AddType: React.FC<AddTypeProps> = ({ setOpenAddType }) => {
  return ReactDOM.createPortal(
    <div className="background" onClick={() => setOpenAddType(false)}>
      <div className="add-type" onClick={(e) => e.stopPropagation()}>
        <h1 className="add-type-title">Добавить тип</h1>
        <div className="add-type__container">
          <div className="add-type__container__field">
            <label htmlFor="title" className="add-type__container__field-label">
              Название
            </label>
            <input
              type="text"
              id="title"
              required
              className="add-type__container__field-input"
              placeholder="Поясные сумки"
            />
          </div>
        </div>
        <div className="add-type__container__btn">
          <Button onClick={() => {}} text="Добавить" color="grey" />
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default AddType;
