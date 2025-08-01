import { Color, HexColor } from '../../../../entities/Item';
import styles from './SelectedItemColors.module.scss';

type SelectedItemColorsProps = {
  leatherColor: Color;
  threadColor: Color;
};

const SelectedItemColors = ({
  leatherColor = Color.BLACK,
  threadColor = Color.BLACK,
}: SelectedItemColorsProps) => {
  return (
    <div className={styles.SelectedItemColors}>
      <div className={styles.itemPartColor}>
        <p>Leather color:</p>
        <div
          className={styles.color}
          style={{
            backgroundColor: HexColor[leatherColor],
          }}
        ></div>
      </div>
      <div className={styles.itemPartColor}>
        <p>Threads color:</p>
        <div
          className={styles.color}
          style={{
            backgroundColor: HexColor[threadColor],
          }}
        ></div>
      </div>
    </div>
  );
};

export default SelectedItemColors;
