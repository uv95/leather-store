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
        <button
          className={styles.color}
          style={{
            backgroundColor: HexColor[leatherColor],
          }}
          onClick={openSelectLeatherColor}
          aria-label={`Select leather color. Current color: ${leatherColor}`}
          aria-haspopup="dialog"
        ></button>
      </div>
      <div className={styles.itemPartColor}>
        <p>Thread color:</p>
        <button
          className={styles.color}
          style={{
            backgroundColor: HexColor[threadColor],
          }}
          onClick={openSelectThreadsColor}
          aria-label={`Select thread color. Current color: ${threadColor}`}
          aria-haspopup="dialog"
        ></button>
      </div>
    </div>
  );
};

export default ItemColors;
