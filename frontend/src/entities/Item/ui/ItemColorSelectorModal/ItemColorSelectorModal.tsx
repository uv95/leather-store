import React, { KeyboardEventHandler } from 'react';
import Modal from '../../../../shared/ui/Modal/Modal';
import { Color, HexColor } from '../../model/types/item';
import styles from './ItemColorSelectorModal.module.scss';

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
  const colors = Object.values(Color);

  const handleOnKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const currentIndex = colors.indexOf(selectedColor);
    e.preventDefault();
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      nextIndex = currentIndex === colors.length - 1 ? 0 : currentIndex + 1;
    }
    if (e.key === 'ArrowLeft') {
      nextIndex = currentIndex === 0 ? colors.length - 1 : currentIndex - 1;
    }
    if (e.key === 'ArrowDown') {
      nextIndex = currentIndex > 5 ? currentIndex - 6 : currentIndex + 3;
    }
    if (e.key === 'ArrowUp') {
      nextIndex = currentIndex < 3 ? currentIndex + 6 : currentIndex - 3;
    }

    setColor(colors[nextIndex]);

    if (e.key === 'Enter') {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.ItemColorSelectorModal}>
        <h2 className={styles.title} id="color-selector-title">
          {title}
        </h2>
        <div
          className={styles.colorList}
          role="radiogroup"
          aria-labelledby="color-selector-title"
        >
          {colors.map((color) => (
            <button
              role="radio"
              aria-checked={selectedColor === color}
              aria-label={color}
              tabIndex={selectedColor === color ? 0 : -1}
              className={`${selectedColor === color ? styles.selected : ''} ${
                styles.colorItem
              }`}
              key={color}
              style={{
                backgroundColor: HexColor[color],
                outlineColor: HexColor[color],
              }}
              onKeyDown={handleOnKeyDown}
              onClick={() => setColor(color)}
            ></button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ItemColorSelectorModal;
