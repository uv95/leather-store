import React from 'react';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import Modal from '../../../../shared/ui/Modal/Modal';
import styles from './ItemColorSelectorModal.module.scss';
import { Color, HexColor } from '../../model/types/item';

interface ItemColorSelectorModalProps {
  title: string;
  setColor: (arg: Color) => void;
  selectedColor: Color;
  onClose: () => void;
  isOpen: boolean;
}

const ItemColorSelectorModal: React.FC<ItemColorSelectorModalProps> = ({
  title,
  setColor,
  selectedColor,
  onClose,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.ItemColorSelectorModal}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.colorList}>
          {Object.values(Color).map((color) => (
            <div
              className={`${selectedColor === color ? styles.selected : ''} ${
                styles.colorItem
              }`}
              key={color}
              style={{
                backgroundColor: HexColor[color],
                outlineColor: HexColor[color],
              }}
              onClick={() => setColor(color)}
            ></div>
          ))}
        </div>
        <Button theme={ButtonTheme.BLACK} size={ButtonSize.L} onClick={onClose}>
          Select
        </Button>
      </div>
    </Modal>
  );
};

export default ItemColorSelectorModal;
