import React from 'react';
import { Color, HexColor, ItemPart } from '../../types/data';
import Button, { ButtonTheme, ButtonSize } from '../../shared/ui/Button/Button';
import './selectColor.scss';

interface SelectColorProps {
  setOpenSelectColor: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  type: ItemPart;
  setColors: React.Dispatch<
    React.SetStateAction<{
      leatherColor: Color;
      threadsColor: Color;
    }>
  >;
  currColor: Color;
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
          {Object.values(Color).map((color) => (
            <div
              className={`${
                currColor === color ? 'color__container__box-checked' : ''
              } color__container__box`}
              key={color}
              onClick={() => {
                setColors((prev) => ({
                  ...prev,
                  [type === ItemPart.THREAD ? 'threadsColor' : 'leatherColor']:
                    color,
                }));
              }}
            >
              <div
                className="color__container__box__img"
                style={{
                  backgroundColor: HexColor[color],
                }}
              ></div>
              <p className="color__container__box-text">
                {color[0].toUpperCase() + color.slice(1)}
              </p>
            </div>
          ))}
        </div>
        <Button
          theme={ButtonTheme.BLACK}
          size={ButtonSize.L}
          onClick={() => setOpenSelectColor(false)}
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default SelectColor;
