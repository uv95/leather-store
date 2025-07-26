import { Color, HexColor } from '../../../types/data';
import './colors.scss';

export enum ColorsPosition {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

type ColorsProps = {
  leatherColor: Color;
  threadColor: Color;
  position?: ColorsPosition;
  fromMyOrders?: boolean;
  openSelectLeatherColor?: () => void;
  openSelectThreadsColor?: () => void;
};

const Colors = ({
  leatherColor = Color.BLACK,
  threadColor = Color.BLACK,
  position = ColorsPosition.HORIZONTAL,
  fromMyOrders,
  openSelectLeatherColor,
  openSelectThreadsColor,
}: ColorsProps) => {
  const baseClass = `colors-${position}`;

  if (!baseClass) {
    return null;
  }

  return (
    <div className={`${baseClass} ${fromMyOrders ? 'fromMyOrders' : ''}`}>
      <div className={`${baseClass}-item`}>
        <p>Leather color:</p>
        <div
          className={`${baseClass}-item--color`}
          style={{
            backgroundColor: HexColor[leatherColor],
          }}
          onClick={openSelectLeatherColor}
        ></div>
      </div>
      <div className={`${baseClass}-item`}>
        <p>Threads:</p>
        <div
          className={`${baseClass}-item--color`}
          style={{
            backgroundColor: HexColor[threadColor],
          }}
          onClick={openSelectThreadsColor}
        ></div>
      </div>
    </div>
  );
};

export default Colors;
