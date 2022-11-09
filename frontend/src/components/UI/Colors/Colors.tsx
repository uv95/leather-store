import React from 'react';
import './colors.scss';

type ColorsProps = {
  leatherColor: string;
  threadsColor: string;
  vertical?: boolean;
  openSelectLeatherColor?: () => void;
  openSelectThreadsColor?: () => void;
};

const Colors = ({
  leatherColor,
  threadsColor,
  vertical,
  openSelectLeatherColor,
  openSelectThreadsColor,
}: ColorsProps) => {
  return (
    <div className={`colors-${vertical ? 'vertical' : 'horizontal'}`}>
      <div className={`colors-${vertical ? 'vertical' : 'horizontal'}-item`}>
        <p>Цвет кожи:</p>
        <img
          src={leatherColor}
          alt="цвет кожи"
          onClick={openSelectLeatherColor}
        />
      </div>
      <div className={`colors-${vertical ? 'vertical' : 'horizontal'}-item`}>
        <p>Нитки:</p>
        <img src={threadsColor} alt="нитки" onClick={openSelectThreadsColor} />
      </div>
    </div>
  );
};

export default Colors;
