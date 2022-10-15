import React, { useState } from 'react';
import './chooseColor.scss';
import black from '../../assets/img/black.jpg';
import check from '../../assets/icons/check.svg';

interface ChooseColorProps {
  setOpenChooseColor: (arg: boolean) => void;
  title: string;
}

const ChooseColor: React.FC<ChooseColorProps> = ({
  setOpenChooseColor,
  title,
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="background" onClick={() => setOpenChooseColor(false)}>
      <div className="color" onClick={(e) => e.stopPropagation()}>
        <h1 className="color-title">{title}</h1>
        <div className="color__container">
          <div className="color__container__box">
            <div className="color__container__box__img">
              <img
                //   onClick={()=>setSelected(true)}
                src={black}
                alt=""
                className="color__container__box__img-circle selected"
              />
              <img
                src={check}
                alt=""
                className="color__container__box__img-check"
              />
            </div>
            <p className="color__container__box-text">Черный</p>
          </div>
          <div className="color__container__box">
            <div className="color__container__box__img">
              <img
                src={black}
                alt=""
                className="color__container__box__img-circle"
              />
            </div>
            <p className="color__container__box-text">Черный</p>
          </div>
          <div className="color__container__box">
            <div className="color__container__box__img">
              <img
                src={black}
                alt=""
                className="color__container__box__img-circle"
              />
            </div>
            <p className="color__container__box-text">Черный</p>
          </div>
          <div className="color__container__box">
            <div className="color__container__box__img">
              <img
                src={black}
                alt=""
                className="color__container__box__img-circle"
              />
            </div>
            <p className="color__container__box-text">Черный</p>
          </div>
          <div className="color__container__box">
            <div className="color__container__box__img">
              <img
                src={black}
                alt=""
                className="color__container__box__img-circle"
              />
            </div>
            <p className="color__container__box-text">Черный</p>
          </div>
          <div className="color__container__box">
            <div className="color__container__box__img">
              <img
                src={black}
                alt=""
                className="color__container__box__img-circle"
              />
            </div>
            <p className="color__container__box-text">Черный</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseColor;
