import React from 'react';
import './selectColor.scss';
import { colors } from '../../utils/consts';
import Button from '../UI/Button/Button';

type SetColors = { leatherColor: string; threadsColor: string };

interface SelectColorProps {
  setOpenSelectColor: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  type: string;
  setColors: React.Dispatch<React.SetStateAction<SetColors>>;
  currColor: string;
}

const SelectColor: React.FC<SelectColorProps> = ({
  setOpenSelectColor,
  title,
  type,
  setColors,
  currColor,
}) => {
  return (
    <div className="background" onClick={() => setOpenSelectColor(false)}>
      <div className="color" onClick={(e) => e.stopPropagation()}>
        <h1 className="color-title">{title}</h1>
        <div className="color__container">
          {Object.keys(colors).map((color, i) => (
            <div
              className={`${
                currColor === color ? 'color__container__box-checked' : ''
              } color__container__box`}
              key={color}
              onClick={() => {
                type === 'threads'
                  ? setColors((prev) => ({ ...prev, threadsColor: color }))
                  : setColors((prev) => ({ ...prev, leatherColor: color }));
              }}
            >
              <div
                className="color__container__box__img"
                style={{ backgroundColor: `${Object.values(colors)[i]}` }}
              ></div>
              <p className="color__container__box-text">{color}</p>
            </div>
          ))}
        </div>
        <Button
          text="Выбрать"
          color="black"
          big
          onClick={() => setOpenSelectColor(false)}
        />
      </div>
    </div>
  );
};

export default SelectColor;
