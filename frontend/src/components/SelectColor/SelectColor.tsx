import React, { useState } from 'react';
import './selectColor.scss';
import black from '../../assets/img/black.jpg';
import check from '../../assets/icons/check.svg';

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
  const leatherColors = ['Черный', 'Красный', 'Синий'];
  const threadsColors = ['Черный', 'Красный', 'Синий'];

  return (
    <div className="background" onClick={() => setOpenSelectColor(false)}>
      <div className="color" onClick={(e) => e.stopPropagation()}>
        <h1 className="color-title">{title}</h1>
        <div className="color__container">
          {type === 'leather' &&
            leatherColors.map((color) => (
              <div className="color__container__box" key={color}>
                <div className="color__container__box__img">
                  <img
                    onClick={() =>
                      setColors((prev) => ({ ...prev, leatherColor: color }))
                    }
                    src={black}
                    alt={color}
                    className="color__container__box__img-circle selected"
                  />
                  {currColor === color && (
                    <img
                      src={check}
                      alt="check"
                      className="color__container__box__img-check"
                    />
                  )}
                </div>
                <p className="color__container__box-text">{color}</p>
              </div>
            ))}
          {type === 'threads' &&
            threadsColors.map((color) => (
              <div className="color__container__box" key={color}>
                <div className="color__container__box__img">
                  <img
                    onClick={() =>
                      setColors((prev) => ({ ...prev, threadsColor: color }))
                    }
                    src={black}
                    alt={color}
                    className="color__container__box__img-circle selected"
                  />
                  {currColor === color && (
                    <img
                      src={check}
                      alt="check"
                      className="color__container__box__img-check"
                    />
                  )}
                </div>
                <p className="color__container__box-text">{color}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SelectColor;
