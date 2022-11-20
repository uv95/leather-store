import React from 'react';
import './colors.scss';
import { colors } from '../../../utils/consts';

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
        <div
          className={`colors-${
            vertical ? 'vertical' : 'horizontal'
          }-item--color`}
          style={{
            backgroundColor: `${colors[leatherColor as keyof typeof colors]}`,
          }}
          onClick={openSelectLeatherColor}
        ></div>
      </div>
      <div className={`colors-${vertical ? 'vertical' : 'horizontal'}-item`}>
        <p>Нитки:</p>
        <div
          className={`colors-${
            vertical ? 'vertical' : 'horizontal'
          }-item--color`}
          style={{
            backgroundColor: `${colors[threadsColor as keyof typeof colors]}`,
          }}
          onClick={openSelectThreadsColor}
        ></div>
      </div>
    </div>
  );
};

export default Colors;
