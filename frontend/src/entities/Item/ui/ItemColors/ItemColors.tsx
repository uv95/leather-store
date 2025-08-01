import { Color, HexColor } from '../../model/types/item';
import styles from './ItemColors.module.scss';

type ItemColorsProps = {
  leatherColor: Color;
  threadColor: Color;
  openSelectLeatherColor: () => void;
  openSelectThreadsColor: () => void;
};

const ItemColors = ({
  leatherColor = Color.BLACK,
  threadColor = Color.BLACK,
  openSelectLeatherColor,
  openSelectThreadsColor,
}: ItemColorsProps) => {
  return (
    <div className={styles.ItemColors}>
      <div className={styles.itemPartColor}>
        <p>Leather color:</p>
        <div
          className={styles.color}
          style={{
            backgroundColor: HexColor[leatherColor],
          }}
          onClick={openSelectLeatherColor}
        ></div>
      </div>
      <div className={styles.itemPartColor}>
        <p>Thread color:</p>
        <div
          className={styles.color}
          style={{
            backgroundColor: HexColor[threadColor],
          }}
          onClick={openSelectThreadsColor}
        ></div>
      </div>
    </div>
  );
};

export default ItemColors;
